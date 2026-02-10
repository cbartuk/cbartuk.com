import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/typings";

type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  const sortedExperiences = experiences.sort((a, b) => {
    if (a.isCurrentlyWorkingHere && !b.isCurrentlyWorkingHere) {
      return -1;
    }
    if (!a.isCurrentlyWorkingHere && b.isCurrentlyWorkingHere) {
      return 1;
    }
    const dateA: any = new Date(a.dateStarted).getTime();
    const dateB: any = new Date(b.dateStarted).getTime();
    return dateB - dateA;
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative overflow-hidden flex-col md:flex-row max-w-full px-10 pt-24 md:pt-0 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-16 uppercase tracking-[20px] text-gray-500 text-2xl z-10">
        Experience
      </h3>

      <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory modifyScrollbar mt-10 md:mt-0">
        {sortedExperiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </div>
    </motion.div>
  );
}
