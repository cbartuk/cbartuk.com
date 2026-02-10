import { Social } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";
import { getContentSourceMode, hasItems, readLocalContent } from "@/utils/localContent";

const query = groq`
*[_type == "social"]
`;

export const fetchSocials = async (): Promise<Social[]> => {
  const mode = getContentSourceMode();
  const localContent = await readLocalContent();

  if (mode === "json") {
    return localContent?.socials ?? [];
  }

  if (mode === "hybrid" && hasItems(localContent?.socials)) {
    return localContent?.socials ?? [];
  }

  try {
    const socials: Social[] = await sanityClient.fetch(query);
    return socials;
  } catch (error) {
    console.error("Error fetching socials:", error);
    return localContent?.socials ?? [];
  }
};
