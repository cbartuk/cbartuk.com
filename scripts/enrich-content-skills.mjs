import fs from "node:fs/promises";
import path from "node:path";

const contentPath = path.join(process.cwd(), "data", "content.json");
const raw = await fs.readFile(contentPath, "utf8");
const content = JSON.parse(raw);
const forceRuleValues = process.env.ENRICH_FORCE === "true";

const skillRules = {
  "TypeScript": { category: "frontend", level: "advanced", yearsExperience: 4, tags: ["Type Safety", "Generics", "DX"], featured: true, currentlyUsing: true },
  "JavaScript": { category: "frontend", level: "advanced", yearsExperience: 5, tags: ["ESNext", "Async", "Browser APIs"], featured: true, currentlyUsing: true },
  "React JS": { category: "frontend", level: "advanced", yearsExperience: 4, tags: ["Hooks", "Component Architecture", "SPA"], featured: true, currentlyUsing: true },
  "Next JS": { category: "frontend", level: "advanced", yearsExperience: 3, tags: ["SSR", "ISR", "Routing"], featured: true, currentlyUsing: true },
  "Tailwind CSS": { category: "frontend", level: "advanced", yearsExperience: 3, tags: ["Utility CSS", "Responsive", "Design System"], featured: true, currentlyUsing: true },
  "Node JS": { category: "backend", level: "advanced", yearsExperience: 3, tags: ["APIs", "Tooling", "Runtime"], featured: false, currentlyUsing: true },
  "Docker": { category: "platform", level: "advanced", yearsExperience: 3, tags: ["Containers", "Dev Environments", "CI"], featured: true, currentlyUsing: true },
  "Kubernetes": { category: "platform", level: "advanced", yearsExperience: 3, tags: ["Orchestration", "Scaling", "Deployments"], featured: true, currentlyUsing: true },
  "Git": { category: "tooling", level: "advanced", yearsExperience: 5, tags: ["Branching", "Code Review", "Release Flow"], featured: true, currentlyUsing: true },
  "HTML": { category: "frontend", level: "advanced", yearsExperience: 6, tags: ["Semantic HTML", "A11y"], featured: false, currentlyUsing: true },
  "CSS": { category: "frontend", level: "advanced", yearsExperience: 6, tags: ["Layout", "Responsive", "Animation"], featured: false, currentlyUsing: true },
  "Figma": { category: "design", level: "intermediate", yearsExperience: 2, tags: ["UI", "Wireframe", "Handoff"], featured: false, currentlyUsing: true },
  "Firebase": { category: "platform", level: "intermediate", yearsExperience: 2, tags: ["Auth", "Firestore", "Storage"], featured: false, currentlyUsing: false },
  "Sanity": { category: "platform", level: "advanced", yearsExperience: 2, tags: ["CMS", "Structured Content", "GROQ"], featured: true, currentlyUsing: true },
  "MongoDB": { category: "backend", level: "intermediate", yearsExperience: 2, tags: ["NoSQL", "Document DB"], featured: false, currentlyUsing: false },
  "PostgreSQL": { category: "backend", level: "intermediate", yearsExperience: 2, tags: ["SQL", "Relational"], featured: false, currentlyUsing: false },
  "Vue JS": { category: "frontend", level: "intermediate", yearsExperience: 2, tags: ["Components", "State"], featured: false, currentlyUsing: false },
  "Nuxt JS": { category: "frontend", level: "intermediate", yearsExperience: 1, tags: ["SSR", "Vue Ecosystem"], featured: false, currentlyUsing: false },
  "Kotlin": { category: "mobile", level: "intermediate", yearsExperience: 1, tags: ["Android", "Native"], featured: false, currentlyUsing: false },
  "Solidity": { category: "backend", level: "advanced", yearsExperience: 3, tags: ["Smart Contracts", "EVM", "Security Basics"], featured: true, currentlyUsing: true },
  "Ethers JS": { category: "frontend", level: "advanced", yearsExperience: 3, tags: ["Wallet Integration", "On-chain Calls", "Contract Interaction"], featured: true, currentlyUsing: true },
  "MetaMask": { category: "frontend", level: "advanced", yearsExperience: 3, tags: ["Wallet UX", "Web3 Auth", "Transaction Flow"], featured: true, currentlyUsing: true },
  "Sequence": { category: "frontend", level: "advanced", yearsExperience: 2, tags: ["Web3 Wallet", "Embedded Wallet", "Session UX"], featured: true, currentlyUsing: true },
};

const normalizeTitle = (title) => String(title || "").trim();
const normalizedTitleKey = (title) => normalizeTitle(title).toLowerCase();

content.skills = (content.skills || [])
  .filter((skill) => normalizedTitleKey(skill.title) !== "web3")
  .map((skill, index) => {
    const title = normalizeTitle(skill.title);
    const rule = skillRules[title] || {};
    const level =
      (forceRuleValues ? rule.level : undefined) ||
      skill.level ||
      rule.level ||
      (skill.progress >= 85
        ? "advanced"
        : skill.progress >= 65
        ? "intermediate"
        : "beginner");

    const yearsExperience =
      (forceRuleValues ? rule.yearsExperience : undefined) ??
      skill.yearsExperience ??
      rule.yearsExperience ??
      Math.max(1, Math.round((skill.progress || 50) / 25));

    return {
      ...skill,
      title,
      category:
        (forceRuleValues ? rule.category : undefined) ||
        skill.category ||
        rule.category ||
        "frontend",
      level,
      yearsExperience,
      summary:
        (forceRuleValues ? rule.summary : undefined) ||
        skill.summary ||
        rule.summary ||
        `${title} used in production-focused projects with clean architecture and maintainable implementation patterns.`,
      tags:
        (forceRuleValues ? rule.tags : undefined) ||
        skill.tags ||
        rule.tags ||
        ["Web"],
      featured:
        (forceRuleValues && rule.featured !== undefined
          ? rule.featured
          : skill.featured) ??
        rule.featured ??
        false,
      currentlyUsing:
        (forceRuleValues && rule.currentlyUsing !== undefined
          ? rule.currentlyUsing
          : skill.currentlyUsing) ??
        rule.currentlyUsing ??
        true,
      order: skill.order ?? index + 1,
    };
  });

const byTitle = new Map();
for (const skill of content.skills) {
  const key = normalizedTitleKey(skill.title);
  if (!byTitle.has(key)) {
    byTitle.set(key, skill);
    continue;
  }

  const current = byTitle.get(key);
  const currentScore = Number(Boolean(current.summary)) + Number(Boolean(current.tags?.length));
  const nextScore = Number(Boolean(skill.summary)) + Number(Boolean(skill.tags?.length));
  if (nextScore > currentScore) {
    byTitle.set(key, skill);
  }
}
content.skills = Array.from(byTitle.values());

const hasSkillByTitle = (title) => content.skills.some((s) => normalizedTitleKey(s.title) === normalizedTitleKey(title));

if (!hasSkillByTitle("React Native")) {
  content.skills.unshift({
    _id: "skill-react-native",
    _type: "skill",
    title: "React Native",
    category: "mobile",
    level: "advanced",
    yearsExperience: 2,
    summary:
      "Builds cross-platform mobile features with React Native, reusable UI architecture, and API-driven experiences.",
    tags: ["Expo", "Navigation", "State", "Performance"],
    featured: true,
    currentlyUsing: true,
    order: 1,
  });
}

if (!hasSkillByTitle("Kubernetes")) {
  content.skills.unshift({
    _id: "skill-kubernetes",
    _type: "skill",
    title: "Kubernetes",
    category: "platform",
    level: "advanced",
    yearsExperience: 3,
    summary:
      "Manages deployment orchestration, scaling, and workload operations in containerized environments.",
    tags: ["K8s", "Deployments", "Services", "Scaling"],
    featured: true,
    currentlyUsing: true,
    order: 2,
  });
}

content.projects = (content.projects || []).map((project) => {
  const targets = [];
  if (project.desktopImage) targets.push("desktop");
  if (project.tabletImage) targets.push("tablet");
  if (project.mobileImage) targets.push("mobile");
  return {
    ...project,
    deviceTargets:
      project.deviceTargets && project.deviceTargets.length > 0
        ? project.deviceTargets
        : targets,
  };
});

content.meta = {
  ...(content.meta || {}),
  updatedAt: new Date().toISOString(),
  notes:
    "Pulled from Sanity, enriched for senior-ready frontend/mobile/platform profile and synced.",
};

await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf8");
console.log("[enrich] Updated data/content.json with deduped senior skill metadata and project device targets.");
