/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { Experience } from "@/typings";
import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
  experience: Experience;
  index: number;
};

export default function ExperienceCard({ experience, index }: Props) {
  const endDateLabel =
    experience?.isCurrentlyWorkingHere || !experience?.dateEnded
      ? "Present"
      : new Date(experience.dateEnded).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });

  const companyImgUrl = getImageUrl(experience?.companyImage);

  return (
    <div className="relative flex items-start gap-4 sm:gap-5 pl-7">
      {/* Timeline dot */}
      <div className="absolute left-0 top-5 w-[15px] h-[15px] rounded-full border-2 border-[#F7AB0A] bg-[#242424] z-10" />

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        viewport={{ once: true }}
        className="flex-1 rounded-xl bg-[#292929] border border-white/[0.06] p-4 sm:p-5 hover:border-[#F7AB0A]/20 transition-colors duration-300"
      >
        {/* Header: logo + title block + date */}
        <div className="flex items-start gap-3 mb-3">
          {companyImgUrl && (
            <img
              src={companyImgUrl}
              alt={experience?.company}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-contain bg-white/[0.05] p-1 flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-semibold text-white leading-tight">
              {experience?.jobTitle}
            </h4>
            <p className="text-[#F7AB0A]/90 font-medium text-xs sm:text-sm mt-px">
              {experience?.company}
            </p>
          </div>
          <p className="text-gray-500 text-[11px] sm:text-xs whitespace-nowrap flex-shrink-0 pt-0.5">
            {new Date(experience?.dateStarted).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}{" "}
            — {endDateLabel}
          </p>
        </div>

        {/* Technologies */}
        {experience.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {experience.technologies.map((tech, techIndex) => {
              const techUrl = getImageUrl(tech.image);
              return techUrl ? (
                <img
                  key={tech._id || `${tech.title}-${techIndex}`}
                  src={techUrl}
                  alt={tech.title}
                  title={tech.title}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded object-contain bg-white/[0.05] p-0.5"
                />
              ) : null;
            })}
          </div>
        )}

        {/* Points */}
        <ul className="space-y-1 text-gray-300 text-xs sm:text-sm">
          {experience.points.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#F7AB0A]/50 mt-0.5 flex-shrink-0 text-[10px]">
                ▸
              </span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}
