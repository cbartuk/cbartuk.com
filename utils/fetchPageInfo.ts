import { PageInfo } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
*[_type == "pageInfo"][0]
`;

export const fetchPageInfo = async (): Promise<PageInfo | null> => {
  try {
    const pageInfo: PageInfo = await sanityClient.fetch(query);
    return pageInfo ?? null;
  } catch (error) {
    console.error("Error fetching page info:", error);
    return null;
  }
};
