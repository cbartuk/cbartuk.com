import { Skill } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";
import { getContentSourceMode, hasItems, readLocalContent } from "@/utils/localContent";

const query = groq`
*[_type == "skill"]
`;

export const fetchSkills = async (): Promise<Skill[]> => {
  const mode = getContentSourceMode();
  const localContent = await readLocalContent();

  if (mode === "json") {
    return localContent?.skills ?? [];
  }

  if (mode === "hybrid" && hasItems(localContent?.skills)) {
    return localContent?.skills ?? [];
  }

  try {
    const skills: Skill[] = await sanityClient.fetch(query);
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return localContent?.skills ?? [];
  }
};
