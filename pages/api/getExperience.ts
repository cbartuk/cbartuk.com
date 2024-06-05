// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";
import { Experience } from "@/typings";

const query = groq`
*[_type == "experience"] {
  ...,
  technologies[]->
}
`;

type Data = {
  experiences: Experience[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | {error: string}>
) {
  try {
    const experiences: Experience[] = await sanityClient.fetch(query);
    console.log({ experiences });
    res.status(200).json({ experiences });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ error: "Error fetching experiences" });
  }
}
