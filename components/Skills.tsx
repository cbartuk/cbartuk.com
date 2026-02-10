import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "@/typings";

type Props = {
  skills: SkillType[];
};

export default function Skills({ skills }: Props) {
  const sortedSkills = [...skills].sort((a, b) => b.progress - a.progress);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex relative overflow-hidden flex-col md:flex-row max-w-full px-10 pt-24 md:pt-0 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-16 uppercase tracking-[20px] text-gray-500 text-2xl z-10">
        Skills
      </h3>

      <h3 className="absolute top-24 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div
        className="grid grid-cols-4 gap-5 max-h-[28rem] sm:max-h-[36rem] pr-8 overflow-y-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80"
        style={{ overflowX: "hidden" }}
      >
        {sortedSkills.map((skill, index) => (
          <Skill
            key={skill._id}
            skill={skill}
            directionLeft={index % 2 === 1}
          />
        ))}
      </div>
    </motion.div>
  );
}
