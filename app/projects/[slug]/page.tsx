// app/projects/[id]/page.tsx
import { projectsData } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function ProjectDetails({
  params,
}: {
  params: { slug: string };
}) {
  {
    /*const project = projectsData.find((p, index) => index.toString() === params.slug);*/
  }

  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={800}
        height={400}
        className="rounded-lg mb-6"
      />
      <p className="text-lg mb-6">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-black/[0.7] px-3 py-1 text-sm text-white rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.projectUrl && (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          View Live Project
        </a>
      )}
    </div>
  );
}
