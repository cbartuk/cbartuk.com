/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/typings";
import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 modifyScrollbar">
        {projects.map((project, i) => {
          const hasDesktop = Boolean(getImageUrl(project?.desktopImage));
          const hasTablet = Boolean(getImageUrl(project?.tabletImage));
          const hasMobile = Boolean(getImageUrl(project?.mobileImage));

          return (
            <div
              key={project._id || `${project.title}-${i}`}
              className="w-screen flex-shrink-0 snap-center flex flex-col items-center justify-center px-8 sm:px-16 md:px-20 h-screen gap-6"
            >
              {/* Device Mockups */}
              <motion.div
                initial={{ y: -200, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
              >
                {hasDesktop ? (
                  <DesktopAnchoredLayout
                    project={project}
                    hasTablet={hasTablet}
                    hasMobile={hasMobile}
                  />
                ) : (
                  <StandaloneDeviceLayout
                    project={project}
                    hasTablet={hasTablet}
                    hasMobile={hasMobile}
                  />
                )}
              </motion.div>

              {/* Project Info */}
              <div className="text-center max-w-2xl space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 tracking-widest uppercase">
                  <span>
                    {i + 1} of {projects.length}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-semibold text-white">
                  {project?.title}
                </h4>

                <div className="flex items-center justify-center flex-wrap gap-2">
                  {project?.technologies.map((tech, techIndex) => (
                    <img
                      key={tech._id || `${tech.title}-${techIndex}`}
                      src={getImageUrl(tech.image)}
                      alt={tech.title}
                      title={tech.title}
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                    />
                  ))}
                </div>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                  {project?.summary}
                </p>

                {project?.linkToBuild && (
                  <a
                    href={project.linkToBuild}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#F7AB0A] hover:text-[#F7AB0A]/80 text-sm font-medium transition-colors"
                  >
                    View Project
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
}

/* Desktop-anchored overlapping layout (original style, with conditionals) */
function DesktopAnchoredLayout({
  project,
  hasTablet,
  hasMobile,
}: {
  project: Project;
  hasTablet: boolean;
  hasMobile: boolean;
}) {
  return (
    <div className="relative flex justify-center items-center">
      {/* Desktop (center anchor) */}
      <div className="relative flex justify-center items-center z-20">
        <img
          src="/images/macbook-mockup.png"
          alt="Desktop frame"
          className="relative w-[320px] sm:w-[400px] md:w-[500px] object-contain z-20"
        />
        <img
          src={getImageUrl(project.desktopImage)}
          alt={`${project.title} - Desktop`}
          className="absolute w-[77%] h-[78%] top-[5%] left-[12%] object-cover z-10"
        />
      </div>

      {/* Tablet (left overlay) */}
      {hasTablet && (
        <div className="absolute flex justify-center items-center -left-16 sm:-left-20 md:-left-[10rem] top-4 md:top-2 z-30">
          <img
            src="/images/ipad.png"
            alt="Tablet frame"
            className="relative w-[150px] sm:w-[185px] md:w-[260px] object-contain z-30"
          />
          <img
            src={getImageUrl(project.tabletImage)}
            alt={`${project.title} - Tablet`}
            className="absolute w-[91%] h-[72%] top-[14%] left-[4%] object-cover z-20"
          />
        </div>
      )}

      {/* Mobile (right overlay) */}
      {hasMobile && (
        <div className="absolute flex justify-center items-center -right-2 sm:-right-4 md:-right-[3rem] top-10 md:top-6 z-30">
          <img
            src="/images/iphone-mockup.png"
            alt="Mobile frame"
            className="relative w-[60px] sm:w-[75px] md:w-[120px] object-contain z-30"
          />
          <img
            src={getImageUrl(project.mobileImage)}
            alt={`${project.title} - Mobile`}
            className="absolute w-[85%] h-[90%] top-[5%] left-[7%] object-cover z-20 rounded-[6px] md:rounded-[10px]"
          />
        </div>
      )}
    </div>
  );
}

/* Layout for projects without a desktop image */
function StandaloneDeviceLayout({
  project,
  hasTablet,
  hasMobile,
}: {
  project: Project;
  hasTablet: boolean;
  hasMobile: boolean;
}) {
  const isMobileOnly = hasMobile && !hasTablet;

  return (
    <div className="flex items-end justify-center gap-6 sm:gap-10">
      {hasTablet && (
        <div className="relative">
          <img
            src="/images/ipad.png"
            alt="Tablet frame"
            className="relative w-[200px] sm:w-[260px] md:w-[320px] object-contain z-20"
          />
          <img
            src={getImageUrl(project.tabletImage)}
            alt={`${project.title} - Tablet`}
            className="absolute w-[91%] h-[72%] top-[14%] left-[4%] object-cover z-10"
          />
        </div>
      )}

      {hasMobile && (
        <div className="relative">
          <img
            src="/images/iphone-mockup.png"
            alt="Mobile frame"
            className={`relative object-contain z-20 ${
              isMobileOnly
                ? "w-[140px] sm:w-[170px] md:w-[200px]"
                : "w-[90px] sm:w-[110px] md:w-[130px]"
            }`}
          />
          <img
            src={getImageUrl(project.mobileImage)}
            alt={`${project.title} - Mobile`}
            className="absolute w-[85%] h-[90%] top-[5%] left-[7%] object-cover z-10 rounded-[10px] md:rounded-[14px]"
          />
        </div>
      )}
    </div>
  );
}
