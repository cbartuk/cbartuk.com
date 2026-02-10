import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "@/typings";

type Props = {
  skills: SkillType[];
};

const levelRank: Record<string, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  beginner: 1,
};

export default function Skills({ skills }: Props) {
  const sortedSkills = [...skills].sort((a, b) => {
    const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredDelta !== 0) {
      return featuredDelta;
    }

    const levelDelta = (levelRank[b.level || ""] || 0) - (levelRank[a.level || ""] || 0);
    if (levelDelta !== 0) {
      return levelDelta;
    }

    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.title.localeCompare(b.title);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="h-screen flex relative flex-col max-w-6xl px-6 sm:px-10 pt-24 pb-10 mx-auto items-center"
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl mb-2">
        Skills
      </h3>
      <p className="uppercase tracking-[3px] text-gray-500 text-sm mb-8">
        Engineering capabilities and focus areas
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto modifyScrollbar pr-2 pb-4">
        {sortedSkills.map((skill, index) => (
          <Skill key={skill._id || `${skill.title}-${index}`} skill={skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
