/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function ExperienceCard({}: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-5 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{
          y: -100,
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
        className="w-24 h-24 rounded-full xl:w-[150px] xl:h-[150px] object-cover object-center"
        src="https://www.themindstone.com/MINDSTONE_files/mindstone-logo-white2.svg"
        alt="mindstone logo"
      />

      <div className="px-14 md:px-20">
        <h4 className="text-3xl font-light">Frontend Engineer</h4>
        <p className="font-bold text-xl mt-1">Mindstone Blockchain Labs</p>
        <div className="flex space-x-2 my-2">
          <img
            className="h-10 w-10 rounded-full"
            src="https://cdn.sanity.io/images/xbn4zmfs/production/ff00c08760983e0e037aaf6ab4e004f4d147276a-383x383.png"
            alt="techLogo"
          />
          <img
            className="h-10 w-10 rounded-full"
            src="https://cdn.sanity.io/images/xbn4zmfs/production/ff00c08760983e0e037aaf6ab4e004f4d147276a-383x383.png"
            alt="techLogo"
          />
          <img
            className="h-10 w-10 rounded-full"
            src="https://cdn.sanity.io/images/xbn4zmfs/production/ff00c08760983e0e037aaf6ab4e004f4d147276a-383x383.png"
            alt="techLogo"
          />

          {/* Tech used */}
          {/* Tech used */}
          {/* Tech used */}
        </div>
        <p className="uppercase py-5 text-gray-300">
          Stated work... - Ended...
        </p>

        <ul className="list-disc space-y-4 ml-5 text-md">
          <li>Summary PointsSummary PointsSummary PointsSummary Points</li>
          <li>Summary PointsSummary PointsSummary PointsSummary Points</li>
          <li>Summary PointsSummary PointsSummary PointsSummary Points</li>
          <li>Summary PointsSummary PointsSummary PointsSummary Points</li>
          <li>Summary PointsSummary PointsSummary PointsSummary Points</li>
        </ul>
      </div>
    </article>
  );
}
