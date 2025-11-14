import { notFound } from "next/navigation";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

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
      <div className="mb-6 text-lg">
        <PortableText
          value={project.description}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="mb-4 leading-relaxed">{children}</p>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              number: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
            },
            marks: {
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
            },
          }}
        />
      </div>
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
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-500 hover:to-orange-400 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent text-gray-900 group-hover:text-white dark:text-white">
            View Live Project
          </span>
        </a>
      )}
    </div>
  );
}
