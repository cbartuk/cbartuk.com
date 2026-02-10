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
  if (!level) return "Practitioner";
  return level.charAt(0).toUpperCase() + level.slice(1);
};

export default function Skill({ skill, index }: Props) {
  const imageUrl = getImageUrl(skill.image);
  const meta = [
    skill.category,
    skill.yearsExperience ? `${skill.yearsExperience}+ yrs` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.025 }}
      viewport={{ once: true }}
      className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 hover:border-[#F7AB0A]/30 hover:bg-white/[0.045] transition-all duration-300"
    >
      <div className="flex items-start gap-3.5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={skill.title}
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-lg bg-black/20 p-1.5 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-black/20 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-gray-400 flex-shrink-0">
            {skill.title.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white leading-tight">
              {skill.title}
            </h4>
            <span className="text-[10px] uppercase tracking-wide px-1.5 py-px rounded-full border border-[#F7AB0A]/35 text-[#F7AB0A]/90 leading-tight">
              {getLevelLabel(skill.level)}
            </span>
            {skill.currentlyUsing && (
              <span className="text-[10px] uppercase tracking-wide px-1.5 py-px rounded-full border border-emerald-400/35 text-emerald-300/90 leading-tight">
                Active
              </span>
            )}
          </div>

          {/* Meta line */}
          {meta && (
            <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{meta}</p>
          )}

          {/* Summary */}
          {skill.summary && (
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
              {skill.summary}
            </p>
          )}

          {/* Tags */}
          {Array.isArray(skill.tags) && skill.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {skill.tags.map((tag) => (
                <span
                  key={`${skill._id || skill.title}-${tag}`}
                  className="text-[10px] text-gray-400 bg-white/[0.04] border border-white/[0.07] rounded-full px-2 py-0.5 leading-tight"
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
