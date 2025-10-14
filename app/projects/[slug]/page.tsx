import { notFound } from "next/navigation";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    imageUrl,
    projectUrl
  }`;

  return await client.fetch(query, { slug });
}

export default async function ProjectDetails({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const imageUrl = project.imageUrl
    ? urlFor(project.imageUrl).width(800).url()
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={project.title}
          width={800}
          height={400}
          className="rounded-lg mb-6"
        />
      )}
      <p className="text-lg mb-6">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags?.map((tag: string, index: number) => (
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
