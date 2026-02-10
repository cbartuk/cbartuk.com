import { Project } from "@/typings";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
*[_type == "project"] {
  ...,
  technologies[]->
}
`;

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const projects: Project[] = await sanityClient.fetch(query);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
