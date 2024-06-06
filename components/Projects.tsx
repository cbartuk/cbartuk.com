/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/typings";
import { urlFor } from "@/sanity";

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
        {projects.map((project, i) => (
          <div
            key={project._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
          >
            <motion.div
              initial={{
                y: -300,
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="relative flex justify-center items-center space-x-4"
            >
              <div className="relative flex justify-center items-center z-20">
                <img
                  src="/images/macbook-mockup.png"
                  alt="MacBook Mockup"
                  className="relative w-[400px] h-[250px] md:w-[500px] md:h-[300px] object-contain z-20"
                />
                <img
                  src={urlFor(project?.image).url()}
                  alt={project?.title}
                  className="absolute w-[262px] h-[168px] min-[552px]:w-[307px] min-[552px]:h-[210px] min-[552px]:top-[8%] sm:w-[310px] sm:h-[210px] md:w-[384px] md:h-[238px] top-[15%] sm:top-[8%] md:top-[7%] left-[12%] md:left-[12%] object-cover z-10"
                />
              </div>
              <div className="absolute flex justify-center items-center -left-20 md:-left-[13rem] top-8 md:top-4 z-30">
                <img
                  src="/images/ipad.png"
                  alt="iPad Mockup"
                  className="relative w-[185px] h-[240px] md:w-[300px] md:h-[350px] object-contain z-30"
                />
                <img
                  src={urlFor(project?.image).url()}
                  alt={project?.title}
                  className="absolute w-[169px] h-[130px] md:w-[275px] md:h-[208px] top-[23%] md:top-[20%] left-[5%] object-cover z-20"
                />
              </div>
              <div className="absolute flex justify-center items-center -right-4 md:-right-[4rem] top-16 md:top-9 z-30">
                <img
                  src="/images/iphone-mockup.png"
                  alt="iPhone Mockup"
                  className="relative w-[75px] h-[200px] md:w-[140px] md:h-[250px] object-contain z-30"
                />
                <img
                  src={urlFor(project?.image).url()}
                  alt={project?.title}
                  className="absolute w-[66px] h-[134px] md:w-[107px] md:h-[234px] top-[16%] md:top-[3%] left-[5%] md:left-[10%] object-cover z-20"
                />
              </div>
            </motion.div>

            <div className="space-y-10 px-0 max-w-6xl">
              <h4 className="text-xl md:text-2xl xl:text-4xl font-semibold text-center">
                <span className="underline decoration-[#F7AB0A]/50">
                  Case Study {i + 1} of {projects.length}:
                </span>{" "}
                {project?.title}
              </h4>

              <div className="flex items-center space-x-4 justify-center">
                {project?.technologies.map((technology) => (
                  <img
                    className="w-7 h-7 sm:w-10 sm:h-10 object-contain"
                    key={technology?._id}
                    src={urlFor(technology?.image).url()}
                    alt={technology?.title}
                  />
                ))}
              </div>

              <p className="text-[0.9rem] md:text-lg text-center md:text-left">
                {project?.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
}
