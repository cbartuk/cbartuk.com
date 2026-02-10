import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/typings";

type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.isCurrentlyWorkingHere && !b.isCurrentlyWorkingHere) return -1;
    if (!a.isCurrentlyWorkingHere && b.isCurrentlyWorkingHere) return 1;
    return (
      new Date(b.dateStarted).getTime() - new Date(a.dateStarted).getTime()
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col max-w-6xl px-4 sm:px-8 lg:px-12 pt-24 pb-10 mx-auto items-center"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl mb-8 flex-shrink-0">
        Experience
      </h3>

      <div className="relative w-full flex-1 overflow-y-auto modifyScrollbar pr-1">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-[#F7AB0A]/40 via-[#F7AB0A]/20 to-transparent" />

        <div className="space-y-5 pb-4">
          {sortedExperiences.map((experience, i) => (
            <ExperienceCard
              key={experience._id || `${experience.company}-${experience.jobTitle}-${i}`}
              experience={experience}
              index={i}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
