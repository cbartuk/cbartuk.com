/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "@/typings";
import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
  pageInfo: PageInfo;
};

export default function About({ pageInfo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-8 sm:px-10 justify-evenly mx-auto items-center gap-8"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      <motion.img
        initial={{ x: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        src={getImageUrl(pageInfo?.profilePic)}
        alt={pageInfo?.name || "Profile"}
        className="-mb-24 md:mb-0 flex-shrink-0 w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover md:rounded-xl md:w-60 md:h-72 xl:w-[420px] xl:h-[420px] border border-white/[0.06]"
      />

      <div className="space-y-6 px-0 md:px-10 max-w-xl">
        <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#F7AB0A]/50">little</span>{" "}
          background
        </h4>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}
