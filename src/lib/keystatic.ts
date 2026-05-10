import { createReader } from '@keystatic/core/reader';
import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig from '../../keystatic.config';

const isDev = process.env.NODE_ENV === 'development';

/**
 * In development: read from local filesystem (fast, works offline).
 * In production:  read live from GitHub API so CMS changes (adds/deletes)
 *                 are reflected immediately without a local sync.
 *
 * GITHUB_TOKEN env var is optional but avoids rate-limiting on Vercel.
 * Set it in Vercel → Settings → Environment Variables.
 */
export const reader = isDev
  ? createReader(process.cwd(), keystaticConfig)
  : createGitHubReader(keystaticConfig, {
      repo: `${process.env.NEXT_PUBLIC_GITHUB_OWNER ?? 'ashupal86'}/${process.env.NEXT_PUBLIC_GITHUB_REPO ?? 'portfolio-v1'}`,
      token: process.env.GITHUB_TOKEN,
    });

export async function getProjects() {
  const projects = await reader.collections.projects.all();
  return projects.sort((a, b) => (a.entry.order || 99) - (b.entry.order || 99));
}

export async function getProjectBySlug(slug: string) {
  return await reader.collections.projects.read(slug);
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
