import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Fetch all projects
export async function getProjects() {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "description": pt::text(description),
    tags,
    imageUrl,
    projectUrl
  }`;
  
  return await client.fetch(query);
}

// Fetch all skills
export async function getSkills() {
  const query = `*[_type == "skill"] | order(order asc) {
    _id,
    name
  }`;
  
  return await client.fetch(query);
}

// Fetch all experience
export async function getExperience() {
  const query = `*[_type == "experience"] | order(order asc) {
    _id,
    title,
    location,
    description,
    icon,
    date
  }`;
  
  return await client.fetch(query);
}