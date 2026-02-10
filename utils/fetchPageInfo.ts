import { PageInfo } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";
import {
  getContentSourceMode,
  hasPageInfo,
  readLocalContent,
} from "@/utils/localContent";

const query = groq`
*[_type == "pageInfo"][0]
`;

export const fetchPageInfo = async (): Promise<PageInfo | null> => {
  const mode = getContentSourceMode();
  const localContent = await readLocalContent();

  if (mode === "json") {
    return localContent?.pageInfo ?? null;
  }

  if (mode === "hybrid" && hasPageInfo(localContent?.pageInfo)) {
    return localContent?.pageInfo ?? null;
  }

  try {
    const pageInfo: PageInfo = await sanityClient.fetch(query);
    return pageInfo ?? null;
  } catch (error) {
    console.error("Error fetching page info:", error);
    return localContent?.pageInfo ?? null;
  }
};
