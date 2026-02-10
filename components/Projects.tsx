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
          const desktopUrl = getImageUrl(project?.desktopImage);
          const tabletUrl = getImageUrl(project?.tabletImage);
          const mobileUrl = getImageUrl(project?.mobileImage);
          const hasDesktop = Boolean(desktopUrl);
          const hasTablet = Boolean(tabletUrl);
          const hasMobile = Boolean(mobileUrl);

          return (
            <div
              key={project._id || `${project.title}-${i}`}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
            >
              <motion.div
                initial={{ y: -300, opacity: 0 }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex justify-center items-center"
              >
                {hasDesktop ? (
                  <DesktopLayout
                    project={project}
                    desktopUrl={desktopUrl}
                    tabletUrl={hasTablet ? tabletUrl : ""}
                    mobileUrl={hasMobile ? mobileUrl : ""}
                  />
                ) : (
                  <StandaloneLayout
                    project={project}
                    tabletUrl={hasTablet ? tabletUrl : ""}
                    mobileUrl={hasMobile ? mobileUrl : ""}
                  />
                )}
              </motion.div>

              <div className="space-y-4 px-0 max-w-6xl">
                <h4 className="text-xl md:text-2xl xl:text-4xl font-semibold text-center">
                  <span className="text-xs text-gray-500 tracking-widest uppercase block mb-2">
                    {i + 1} / {projects.length}
                  </span>
                  {project?.title}
                </h4>

                <div className="flex items-center space-x-3 justify-center">
                  {project?.technologies.map((tech, techIndex) => {
                    const url = getImageUrl(tech.image);
                    return url ? (
                      <img
                        className="w-7 h-7 sm:w-10 sm:h-10 object-contain"
                        key={tech._id || `${tech.title}-${techIndex}`}
                        src={url}
                        alt={tech.title}
                        title={tech.title}
                      />
                    ) : null;
                  })}
                </div>

                <p className="text-[0.9rem] md:text-lg text-center md:text-left text-gray-400">
                  {project?.summary}
                </p>

                {project?.linkToBuild && (
                  <div className="text-center">
                    <a
                      href={project.linkToBuild}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#F7AB0A] hover:text-[#F7AB0A]/80 text-sm font-medium transition-colors"
                    >
                      View Project
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
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

/* ------------------------------------------------------------------ */
/*  Desktop-anchored overlapping layout — original pixel dimensions    */
/* ------------------------------------------------------------------ */
function DesktopLayout({
  project,
  desktopUrl,
  tabletUrl,
  mobileUrl,
}: {
  project: Project;
  desktopUrl: string;
  tabletUrl: string;
  mobileUrl: string;
}) {
  return (
    <>
      {/* MacBook — center anchor */}
      <div className="relative flex justify-center items-center z-20">
        <img
          src="/images/macbook-mockup.png"
          alt="Desktop frame"
          className="relative w-[400px] h-[250px] md:w-[500px] md:h-[300px] object-contain z-20"
        />
        <img
          src={desktopUrl}
          alt={`${project.title} – Desktop`}
          className="absolute w-[262px] h-[168px] sm:w-[310px] sm:h-[210px] md:w-[384px] md:h-[238px] top-[15%] sm:top-[8%] md:top-[7%] left-[12%] object-cover z-10"
        />
      </div>

      {/* iPad — left overlay */}
      {tabletUrl && (
        <div className="absolute flex justify-center items-center -left-20 md:-left-[13rem] top-8 md:top-4 z-30">
          <img
            src="/images/ipad.png"
            alt="Tablet frame"
            className="relative w-[185px] h-[240px] md:w-[300px] md:h-[350px] object-contain z-30"
          />
          <img
            src={tabletUrl}
            alt={`${project.title} – Tablet`}
            className="absolute w-[169px] h-[130px] md:w-[275px] md:h-[208px] top-[23%] md:top-[20%] left-[5%] object-cover z-20"
          />
        </div>
      )}

      {/* iPhone — right overlay */}
      {mobileUrl && (
        <div className="absolute flex justify-center items-center -right-4 md:-right-[4rem] top-16 md:top-9 z-30">
          <img
            src="/images/iphone-mockup.png"
            alt="Mobile frame"
            className="relative w-[75px] h-[200px] md:w-[140px] md:h-[250px] object-contain z-30"
          />
          <img
            src={mobileUrl}
            alt={`${project.title} – Mobile`}
            className="absolute w-[66px] h-[134px] md:w-[107px] md:h-[234px] top-[16%] md:top-[3%] left-[5%] md:left-[10%] object-cover z-20"
          />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Standalone layout — no desktop, tablet/mobile larger               */
/* ------------------------------------------------------------------ */
function StandaloneLayout({
  project,
  tabletUrl,
  mobileUrl,
}: {
  project: Project;
  tabletUrl: string;
  mobileUrl: string;
}) {
  const isMobileOnly = Boolean(mobileUrl) && !tabletUrl;

  return (
    <div className="flex items-end justify-center gap-6 sm:gap-10">
      {/* Tablet — ~1.4× overlay size */}
      {tabletUrl && (
        <div className="relative flex justify-center items-center">
          <img
            src="/images/ipad.png"
            alt="Tablet frame"
            className="relative w-[260px] h-[336px] md:w-[420px] md:h-[490px] object-contain z-20"
          />
          <img
            src={tabletUrl}
            alt={`${project.title} – Tablet`}
            className="absolute w-[237px] h-[182px] md:w-[385px] md:h-[291px] top-[23%] md:top-[20%] left-[5%] object-cover z-10"
          />
        </div>
      )}

      {/* iPhone — mobile only ≈ 1.8×, alongside tablet ≈ 1.3× */}
      {mobileUrl && (
        <div className="relative flex justify-center items-center">
          <img
            src="/images/iphone-mockup.png"
            alt="Mobile frame"
            className={`relative object-contain z-20 ${
              isMobileOnly
                ? "w-[135px] h-[360px] md:w-[210px] md:h-[375px]"
                : "w-[98px] h-[260px] md:w-[182px] md:h-[325px]"
            }`}
          />
          <img
            src={mobileUrl}
            alt={`${project.title} – Mobile`}
            className={`absolute object-cover z-10 ${
              isMobileOnly
                ? "w-[119px] h-[241px] md:w-[160px] md:h-[350px] top-[16%] md:top-[3%] left-[5%] md:left-[10%]"
                : "w-[86px] h-[174px] md:w-[139px] md:h-[304px] top-[16%] md:top-[3%] left-[5%] md:left-[10%]"
            }`}
          />
        </div>
      )}
    </div>
  );
}
