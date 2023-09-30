/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { Experience } from "@/typings";
import { urlFor } from "@/sanity";

type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[420px] sm:w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-5 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full xl:w-[150px] xl:h-[150px] object-contain object-center"
        src={urlFor(experience?.companyImage).url()}
        alt={experience?.company}
      />

      <div className="px-14 sm:px-10 md:px-20">
        <h4 className="text-2xl sm:text-3xl font-light">
          {experience?.jobTitle}
        </h4>
        <p className="font-bold text-lg sm:text-xl mt-1">{experience?.company}</p>
        <div className="flex space-x-2 my-2">
          {experience.technologies?.map((technology) => (
            <img
              key={technology._id}
              className="h-6 w-6 sm:h-7 sm:w-7 lg:h-10 lg:w-10 rounded-full object-contain object-center hover:opacity-80 transition-opacity duration-200"
              src={urlFor(technology.image).url()}
              alt={technology.title}
            />
          ))}
        </div>
        <p className="uppercase py-5 text-gray-300">
          {new Date(experience?.dateStarted).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}{" "}
          -{" "}
          {experience?.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience?.dateEnded).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
        </p>

        <ul className="list-disc list-inside space-y-4 text-xs sm:text-md lg:text-lg max-h-[9rem] sm:max-h-72 overflow-y-scroll pr-5 scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
          {experience.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
