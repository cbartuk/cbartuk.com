/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillType } from "@/typings";
import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
  skill: SkillType;
  index: number;
};

const getLevelLabel = (level?: SkillType["level"]): string => {
  if (!level) {
    return "Practitioner";
  }
  return level.charAt(0).toUpperCase() + level.slice(1);
};

export default function Skill({ skill, index }: Props) {
  const hasMeta = Boolean(skill.category || skill.yearsExperience || skill.currentlyUsing);
  const imageUrl = getImageUrl(skill.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      viewport={{ once: true }}
      className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 hover:border-[#F7AB0A]/35 hover:bg-white/[0.05] transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={skill.title}
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-lg bg-black/20 p-1.5"
          />
        ) : (
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-black/20 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-gray-300">
            {skill.title.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base sm:text-lg font-semibold text-white leading-tight">
              {skill.title}
            </h4>
            <span className="text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full border border-[#F7AB0A]/40 text-[#F7AB0A]">
              {getLevelLabel(skill.level)}
            </span>
            {skill.currentlyUsing && (
              <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border border-emerald-400/40 text-emerald-300">
                Active
              </span>
            )}
          </div>

          {hasMeta && (
            <p className="text-xs text-gray-400 mt-1">
              {[skill.category, skill.yearsExperience ? `${skill.yearsExperience}+ years` : null]
                .filter(Boolean)
                .join(" • ")}
            </p>
          )}

          {skill.summary && (
            <p className="text-sm text-gray-300 mt-2 leading-relaxed">{skill.summary}</p>
          )}

          {Array.isArray(skill.tags) && skill.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {skill.tags.map((tag) => (
                <span
                  key={`${skill._id || skill.title}-${tag}`}
                  className="text-[11px] text-gray-300 bg-white/[0.05] border border-white/[0.08] rounded-full px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
