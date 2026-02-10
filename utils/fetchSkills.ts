import { Skill } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
*[_type == "skill"]
`;

export const fetchSkills = async (): Promise<Skill[]> => {
  try {
    const skills: Skill[] = await sanityClient.fetch(query);
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};
