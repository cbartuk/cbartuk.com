import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const cwd = process.cwd();

const loadEnvFile = async (filename) => {
  try {
    const filePath = path.join(cwd, filename);
    const raw = await fs.readFile(filePath, "utf8");
    raw.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eq = trimmed.indexOf("=");
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
  } catch {
    // ignore missing env files
  }
};

await loadEnvFile(".env");
await loadEnvFile(".env.local");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = "2021-03-25";
const prune = process.env.SANITY_SYNC_PRUNE === "true";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment.");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in environment.");
  process.exit(1);
}

const contentPath = path.join(process.cwd(), "data", "content.json");

const slugify = (value) =>
  String(value || "untitled")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

const ensureId = (doc, type, fallback) => {
  if (doc?._id) {
    return doc._id;
  }
  return `${type}.${slugify(fallback)}`;
};

const normalizeTechnologyReferences = (technologies = []) => {
  return technologies
    .map((tech) => {
      if (tech?._type === "reference" && tech?._ref) {
        return tech;
      }

      if (tech?._id) {
        return {
          _type: "reference",
          _ref: tech._id,
        };
      }

      return null;
    })
    .filter(Boolean);
};

const normalizeSkill = (doc, index) => {
  const _id = ensureId(doc, "skill", doc.title || index);
  return {
    ...doc,
    _id,
    _type: "skill",
  };
};

const normalizeSocial = (doc, index) => {
  const _id = ensureId(doc, "social", doc.title || doc.url || index);
  return {
    ...doc,
    _id,
    _type: "social",
  };
};

const normalizeExperience = (doc, index) => {
  const _id = ensureId(doc, "experience", `${doc.company || "company"}-${doc.jobTitle || index}`);
  return {
    ...doc,
    _id,
    _type: "experience",
    technologies: normalizeTechnologyReferences(doc.technologies),
  };
};

const normalizeProject = (doc, index) => {
  const _id = ensureId(doc, "project", doc.title || index);
  return {
    ...doc,
    _id,
    _type: "project",
    technologies: normalizeTechnologyReferences(doc.technologies),
  };
};

const normalizePageInfo = (doc) => {
  if (!doc) {
    return null;
  }
  const _id = ensureId(doc, "pageInfo", doc.name || "main");
  return {
    ...doc,
    _id,
    _type: "pageInfo",
  };
};

const readContent = async () => {
  const raw = await fs.readFile(contentPath, "utf8");
  return JSON.parse(raw);
};

const createClientWithWrite = () =>
  createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

const upsertAll = async (client, docs) => {
  if (docs.length === 0) {
    return;
  }

  let tx = client.transaction();
  for (const doc of docs) {
    tx = tx.createOrReplace(doc);
  }
  await tx.commit({ autoGenerateArrayKeys: true });
};

const pruneMissing = async (client, type, localIds) => {
  if (!prune) {
    return;
  }

  const existingIds = await client.fetch(`*[_type == "${type}"]{_id}`);
  const toDelete = existingIds
    .map((item) => item._id)
    .filter((id) => !localIds.has(id));

  if (toDelete.length === 0) {
    return;
  }

  let tx = client.transaction();
  for (const id of toDelete) {
    tx = tx.delete(id);
  }
  await tx.commit();
  console.log(`[sync:push] Pruned ${toDelete.length} '${type}' documents.`);
};

const content = await readContent();
const client = createClientWithWrite();

const pageInfo = normalizePageInfo(content.pageInfo);
const skills = (content.skills || []).map(normalizeSkill);
const socials = (content.socials || []).map(normalizeSocial);
const experiences = (content.experiences || []).map(normalizeExperience);
const projects = (content.projects || []).map(normalizeProject);

const documents = [
  ...(pageInfo ? [pageInfo] : []),
  ...skills,
  ...socials,
  ...experiences,
  ...projects,
];

await upsertAll(client, documents);

await pruneMissing(client, "skill", new Set(skills.map((x) => x._id)));
await pruneMissing(client, "social", new Set(socials.map((x) => x._id)));
await pruneMissing(client, "experience", new Set(experiences.map((x) => x._id)));
await pruneMissing(client, "project", new Set(projects.map((x) => x._id)));
if (pageInfo) {
  await pruneMissing(client, "pageInfo", new Set([pageInfo._id]));
}

console.log(`[sync:push] Synced ${documents.length} documents from ${contentPath}`);
