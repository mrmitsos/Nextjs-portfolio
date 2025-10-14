"use client";

import React, { useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInview } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInview("About");

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-m-28"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About me</SectionHeading>

      {/*<p className="mb-3">After graduating with a degree in{" "}
        <span className="font-medium">Accounting</span>, I decided to pursue my
        passion for programming. I enrolled in a coding bootcamp and learned{" "}
        <span className="font-medium">full-stack web development</span>.{" "}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem. My core stack
        is{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span>
        . I am also familiar with TypeScript and Prisma. I am always looking to
        learn new technologies. I am currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
        </p>*/}

      <p className="mb-3">
        I`m Dimitris, a front-end developer who creates clean, responsive, and
        user-friendly web experiences. I specialize in React and Next.js,
        turning ideas into fast, modern websites and apps. I`m always exploring
        new tools and techniques to make development more efficient and
        enjoyable.
      </p>

      <p>
        <span className="italic">When I’m not coding</span>, you’ll probably
        find me playing video games, watching movies, or going for a run. I also
        love <span className="font-medium">learning new things</span> — whether
        it’s about front-end development or just becoming a better person every
        day.
      </p>
    </motion.section>
  );
}
