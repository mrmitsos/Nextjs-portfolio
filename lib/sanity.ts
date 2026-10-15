import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Cached on the server and refreshed at most once per minute.
const revalidate = { next: { revalidate: 60 } };

export type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  projectUrl?: string;
  imageSrc: string;
};

export type Skill = {
  _id: string;
  name: string;
};

export type ExperienceItem = {
  _id: string;
  title: string;
  location: string;
  description: string;
  icon?: string;
  date: string;
};

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "description": pt::text(description),
    tags,
    imageUrl,
    projectUrl
  }`;

  const projects = await client.fetch(query, {}, revalidate);
  return projects.map(({ imageUrl, ...project }: any) => ({
    ...project,
    imageSrc: imageUrl ? urlFor(imageUrl).width(900).url() : "",
  }));
}

// Fetch all skills
export async function getSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"] | order(order asc) {
    _id,
    name
  }`;

  return await client.fetch(query, {}, revalidate);
}

// Fetch all experience
export async function getExperience(): Promise<ExperienceItem[]> {
  const query = `*[_type == "experience"] | order(order asc) {
    _id,
    title,
    location,
    description,
    icon,
    date
  }`;

  return await client.fetch(query, {}, revalidate);
}
