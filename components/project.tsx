"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

type ProjectProps = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: any;
  projectUrl: string;
};

export default function Project({
  slug,
  title,
  description,
  tags,
  imageUrl,
  projectUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // Convert Sanity image to URL
  const imageUrlString = imageUrl ? urlFor(imageUrl).width(800).url() : "";

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-[42rem] rounded-lg border border-black/5 overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <Link href={`/projects/${slug}`}>
          <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70 line-clamp-2">
              {description}
            </p>
            <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
              {tags?.slice(0, 4).map((tag, index) => (
                <li
                  className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70 whitespace-nowrap"
                  key={index}
                >
                  {tag}
                </li>
              ))}
              {tags && tags.length > 5 && (
                <li className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70">
                  +{tags.length - 4} more
                </li>
              )}
            </ul>
          </div>
        </Link>

        {imageUrlString && (
          <Image
            src={imageUrlString}
            alt={title}
            width={800}
            height={600}
            quality={95}
            className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:right-[initial] group-even:-left-40  group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2"
          />
        )}
      </section>
    </motion.div>
  );
}
