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

  return (
    <div className="relative flex items-start gap-5 pl-7">
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-[15px] h-[15px] rounded-full border-2 border-[#F7AB0A] bg-[#242424] z-10" />

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex-1 rounded-xl bg-[#292929] border border-white/[0.06] p-5 sm:p-6 hover:border-[#F7AB0A]/20 transition-colors duration-300"
      >
        <div className="flex items-start gap-4 mb-3">
          <img
            src={getImageUrl(experience?.companyImage)}
            alt={experience?.company}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-lg object-contain bg-white/[0.05] p-1.5 flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-base sm:text-lg font-semibold text-white leading-tight">
              {experience?.jobTitle}
            </h4>
            <p className="text-[#F7AB0A] font-medium text-sm mt-0.5">
              {experience?.company}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {new Date(experience?.dateStarted).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}{" "}
              &mdash; {endDateLabel}
            </p>
          </div>
        </div>

        {/* Technologies */}
        {experience.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {experience.technologies.map((tech, techIndex) => (
              <img
                key={tech._id || `${tech.title}-${techIndex}`}
                src={getImageUrl(tech.image)}
                alt={tech.title}
                title={tech.title}
                className="w-6 h-6 rounded object-contain bg-white/[0.05] p-0.5"
              />
            ))}
          </div>
        )}

        {/* Points */}
        <ul className="space-y-1.5 text-gray-300 text-sm">
          {experience.points.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#F7AB0A]/60 mt-0.5 flex-shrink-0 text-xs">
                ▸
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}
