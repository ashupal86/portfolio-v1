import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Create a reader for local filesystem (we are only doing this during build/dev)
export const reader = createReader(process.cwd(), keystaticConfig);

export async function getProjects() {
  const projects = await reader.collections.projects.all();
  return projects.sort((a, b) => (a.entry.order || 99) - (b.entry.order || 99));
}

export async function getProjectBySlug(slug: string) {
  const project = await reader.collections.projects.read(slug);
  return project;
}

export async function getPosts() {
  const posts = await reader.collections.posts.all();
  return posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0);
    const dateB = new Date(b.entry.publishedDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getSiteConfig() {
  return await reader.singletons.siteConfig.read();
}

export async function getHero() {
  return await reader.singletons.hero.read();
}

export async function getAbout() {
  return await reader.singletons.about.read();
}

