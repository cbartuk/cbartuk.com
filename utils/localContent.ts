import fs from "node:fs/promises";
import path from "node:path";
import { Experience, PageInfo, Project, Skill, Social } from "@/typings";

export type ContentSourceMode = "sanity" | "json" | "hybrid";

export type LocalContent = {
  meta?: {
    source?: string;
    updatedAt?: string;
    notes?: string;
  };
  pageInfo?: PageInfo | null;
  socials?: Social[];
  experiences?: Experience[];
  skills?: Skill[];
  projects?: Project[];
};

const CONTENT_FILE_PATH = path.join(process.cwd(), "data", "content.json");

export const getContentSourceMode = (): ContentSourceMode => {
  const mode = (process.env.CONTENT_SOURCE || "hybrid").toLowerCase();
  if (mode === "sanity" || mode === "json" || mode === "hybrid") {
    return mode;
  }
  return "hybrid";
};

export const readLocalContent = async (): Promise<LocalContent | null> => {
  try {
    const raw = await fs.readFile(CONTENT_FILE_PATH, "utf8");
    return JSON.parse(raw) as LocalContent;
  } catch {
    return null;
  }
};

export const hasItems = <T>(arr: T[] | undefined | null): arr is T[] =>
  Array.isArray(arr) && arr.length > 0;

export const hasPageInfo = (pageInfo: PageInfo | null | undefined): boolean => {
  if (!pageInfo) {
    return false;
  }
  return Boolean(pageInfo.name && pageInfo.role);
};
