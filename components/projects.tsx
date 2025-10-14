"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInview } from "@/lib/hooks";
import { getProjects } from "@/lib/sanity";

export default function Projects() {
  const { ref } = useSectionInview("Projects", 0.5);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <section ref={ref} id="projects" className="scroll-m-28 mb-28">
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {projects.map((project: any, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}