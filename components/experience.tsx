"use client";

import React, { useContext, useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInview } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { getExperience } from "@/lib/sanity";
import { LuGraduationCap } from "react-icons/lu";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";

// Icon mapping
const iconMap: { [key: string]: React.ReactElement } = {
  graduation: React.createElement(LuGraduationCap),
  work: React.createElement(CgWorkAlt),
  react: React.createElement(FaReact),
};

export default function Experience() {
  const { ref } = useSectionInview("Experience");
  const { theme } = useTheme();
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperience() {
      const data = await getExperience();
      setExperiences(data);
    }
    fetchExperience();
  }, []);

  return (
    <section ref={ref} id="experience" className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiences.map((item, index) => (
          <React.Fragment key={item._id}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255,255,255,0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0,0,0,0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid #9ca3af"
                    : "0.4rem solid rgba(255,255,255,0.5)",
              }}
              date={item.date}
              icon={iconMap[item.icon] || iconMap.work}
              iconStyle={{
                background:
                  theme === "light" ? "white" : "rgba(255,255,255,0.15)",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75 whitespace-pre-line">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
