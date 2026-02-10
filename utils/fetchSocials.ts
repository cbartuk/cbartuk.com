import { Social } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
*[_type == "social"]
`;

export const fetchSocials = async (): Promise<Social[]> => {
  try {
    const socials: Social[] = await sanityClient.fetch(query);
    return socials;
  } catch (error) {
    console.error("Error fetching socials:", error);
    return [];
  }
};
