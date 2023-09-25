import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function About({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>

      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        src="https://pbs.twimg.com/profile_images/1611702783429730305/9eesat_b_400x400.jpg"
        className="-mb-30 mt-28 md:mb-0 flex-shrink-0 w-48 h-48 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[500px]"
      />

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-3xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#F7AB0A]/50">little</span>{" "}
          background
        </h4>
        <p className="text-base">
          I&apos;m Bartu. I have been interested in electronics since childhood
          💡. This curiosity led me to make robots 🤖 and to learn how to
          program them. That journey continued with a fast and comprehensive
          entry to the software world. I have focused rowing and enhancing my
          skillset consists of all these areas. I believe that the learning
          process is an ongoing lifestyle. Through all the education and
          experience I had in my career; As the intersection point of my
          childhood dreams and my professional career, led me to commit to work
          on Software Engineering. My main goal in this field is being
          productive to solve real life problems by having a pragmatic
          mindset.👨🏻‍💻 Currently, I am advancing my career in web programming and
          mobile programming.
        </p>
      </div>
    </motion.div>
  );
}
