"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInview } from "@/lib/hooks";
import { getProjects, urlFor } from "@/lib/sanity";

type ProjectData = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: any;
  projectUrl: string;
};

export default function Projects() {
  const { ref } = useSectionInview("Projects", 0.5);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

    // Active card = the one whose center is closest to the viewport center
    const children = Array.from(el.children) as HTMLElement[];
    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(childCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, projects.length]);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  const scrollByCard = (direction: 1 | -1) => {
    scrollToIndex(
      Math.min(Math.max(activeIndex + direction, 0), projects.length - 1)
    );
  };

  return (
    <section ref={ref} id="projects" className="scroll-m-28 mb-28 w-full">
      <SectionHeading>My Projects</SectionHeading>

      <div className="relative mx-auto max-w-[64rem]">
        {/* Edge fades hint that there's more to scroll */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-gray-50 to-transparent transition-opacity duration-300 dark:from-gray-900 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-gray-50 to-transparent transition-opacity duration-300 dark:from-gray-900 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Scroll-snap track */}
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          role="region"
          aria-label="Projects carousel"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.slug ?? index} {...project} index={index} />
          ))}
        </div>

        {/* Controls */}
        {projects.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-6">
            <CarouselButton
              direction="prev"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard(-1)}
            />

            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 bg-gray-800 dark:bg-white"
                      : "w-1.5 bg-gray-400/60 hover:bg-gray-500 dark:bg-white/30 dark:hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <CarouselButton
              direction="next"
              disabled={!canScrollRight}
              onClick={() => scrollByCard(1)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-gray-700 shadow-sm transition hover:scale-105 hover:bg-gray-50 active:scale-95 disabled:pointer-events-none disabled:opacity-30 dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={direction === "prev" ? "rotate-180" : ""}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

type ProjectCardProps = ProjectData & { index: number };

function ProjectCard({
  slug,
  title,
  description,
  tags,
  imageUrl,
  index,
}: ProjectCardProps) {
  const imageUrlString = imageUrl ? urlFor(imageUrl).width(900).url() : "";
  const visibleTags = tags?.slice(0, 4) ?? [];
  const hiddenCount = tags && tags.length > 4 ? tags.length - 4 : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3) }}
      className="group w-[85vw] max-w-[24rem] flex-shrink-0 snap-center sm:w-[24rem]"
    >
      <Link
        href={`/projects/${slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-gray-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/[0.15]"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-white/5">
          {imageUrlString && (
            <Image
              src={imageUrlString}
              alt={title}
              fill
              sizes="(max-width: 640px) 85vw, 24rem"
              quality={95}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <span
              aria-hidden
              className="mt-1 -translate-x-1 text-gray-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-white/50"
            >
              →
            </span>
          </div>

          <p className="mt-2 line-clamp-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2 pt-1 sm:mt-auto">
            {visibleTags.map((tag, i) => (
              <li
                key={i}
                className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:bg-white/10 dark:text-white/70"
              >
                {tag}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="rounded-full border border-black/20 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-gray-600 dark:border-white/20 dark:text-white/60">
                +{hiddenCount} more
              </li>
            )}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}