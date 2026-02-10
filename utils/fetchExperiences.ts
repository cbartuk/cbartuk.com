import { Experience } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";
import { getContentSourceMode, hasItems, readLocalContent } from "@/utils/localContent";

const query = groq`
*[_type == "experience"] {
  ...,
  technologies[]->
}
`;

export const fetchExperiences = async (): Promise<Experience[]> => {
  const mode = getContentSourceMode();
  const localContent = await readLocalContent();

  if (mode === "json") {
    return localContent?.experiences ?? [];
  }

  if (mode === "hybrid" && hasItems(localContent?.experiences)) {
    return localContent?.experiences ?? [];
  }

  try {
    const experiences: Experience[] = await sanityClient.fetch(query);
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return localContent?.experiences ?? [];
  }
};
