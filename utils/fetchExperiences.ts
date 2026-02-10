import { Experience } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
*[_type == "experience"] {
  ...,
  technologies[]->
}
`;

export const fetchExperiences = async (): Promise<Experience[]> => {
  try {
    const experiences: Experience[] = await sanityClient.fetch(query);
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};
