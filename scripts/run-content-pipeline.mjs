import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const loadEnvFile = async (filename) => {
  try {
    const filePath = path.join(process.cwd(), filename);
    const raw = await fs.readFile(filePath, "utf8");
    raw.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) {
        return;
      }
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
  } catch {
    // Ignore missing env files.
  }
};

const run = (command, args = [], extraEnv = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env: {
        ...process.env,
        ...extraEnv,
      },
      shell: false,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });

const main = async () => {
  await loadEnvFile(".env");
  await loadEnvFile(".env.local");

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN");
  }

  const env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
    NEXT_PUBLIC_SANITY_DATASET: dataset,
    SANITY_API_WRITE_TOKEN: token,
  };

  console.log("[pipeline] 1/4 pull from Sanity");
  await run("node", ["scripts/sync-sanity-to-json.mjs"], env);

  console.log("[pipeline] 2/4 enrich local JSON");
  await run("node", ["scripts/enrich-content-skills.mjs"], env);

  console.log("[pipeline] 3/4 push to Sanity");
  await run("node", ["scripts/sync-json-to-sanity.mjs"], env);

  console.log("[pipeline] 4/4 verify pull");
  await run("node", ["scripts/sync-sanity-to-json.mjs"], env);

  console.log("[pipeline] Done: Sanity <-> JSON fully synchronized.");
};

main().catch((error) => {
  console.error("[pipeline] Failed:", error.message || error);
  process.exit(1);
});
