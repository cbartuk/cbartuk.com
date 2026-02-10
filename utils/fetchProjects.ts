import { Project } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";
import { getContentSourceMode, hasItems, readLocalContent } from "@/utils/localContent";

const query = groq`
*[_type == "project"] {
  ...,
  technologies[]->
}
`;

export const fetchProjects = async (): Promise<Project[]> => {
  const mode = getContentSourceMode();
  const localContent = await readLocalContent();

  if (mode === "json") {
    return localContent?.projects ?? [];
  }

  if (mode === "hybrid" && hasItems(localContent?.projects)) {
    return localContent?.projects ?? [];
  }

  try {
    const projects: Project[] = await sanityClient.fetch(query);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return localContent?.projects ?? [];
  }
};
