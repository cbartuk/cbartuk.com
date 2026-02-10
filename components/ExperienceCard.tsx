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
    <article className="flex flex-col rounded-lg items-center space-y-6 flex-shrink-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[650px] snap-center bg-[#292929] p-5 sm:p-7 md:p-10 lg:p-12 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
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
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full object-contain object-center"
        src={urlFor(experience?.companyImage).url()}
        alt={experience?.company}
      />

      <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light">
          {experience?.jobTitle}
        </h4>
        <p className="font-bold text-lg sm:text-xl mt-1">
          {experience?.company}
        </p>
        <div className="flex space-x-2 my-2">
          {experience.technologies?.map((technology) => (
            <img
              key={technology._id}
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full object-contain object-center hover:opacity-80 transition-opacity duration-200"
              src={urlFor(technology.image).url()}
              alt={technology.title}
            />
          ))}
        </div>
        <p className="uppercase py-3 text-gray-300 text-sm sm:text-md md:text-lg">
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

        <ul className="list-disc list-inside space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base lg:text-lg max-h-32 sm:max-h-40 md:max-h-48 lg:max-h-60 xl:max-h-72 overflow-y-scroll pr-4 scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
          {experience.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
