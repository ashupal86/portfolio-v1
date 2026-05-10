import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, reader } from '@/lib/keystatic';
import styles from './ProjectPage.module.css';

export const dynamic = 'force-dynamic';

// Static fallback data — kept in sync with page.tsx FALLBACK_PROJECTS
const STATIC_PROJECTS: Record<string, {
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}> = {
  graminstore: {
    title: 'GraminStore',
    description:
      'A web app offering quick commerce for consumers with a "pay later" feature, while also empowering merchants to manage customers, books, and inventory efficiently. Built with real-time WebSocket updates for live order tracking.',
    techStack: ['React', 'FastAPI', 'WebSockets', 'PostgreSQL', 'Docker', 'SqlAdmin'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=85',
    githubUrl: 'https://github.com/ashupal86',
  },
  'safe-query-ai': {
    title: 'Safe Query AI',
    description:
      'Enables analytical decision-making and dashboard creation directly from database tables using natural language queries. Features access levels, administrative approval workflows, query approval for unauthorized users, and AI agents verifying data safety before execution — protecting live data from accidental manipulation.',
    techStack: ['FastAPI', 'SqlAdmin', 'PostgreSQL', 'React', 'Node.js', 'Langchain', 'Qdrant'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85',
    githubUrl: 'https://github.com/ashupal86',
  },
  'bot-web': {
    title: 'Bot-Web',
    description:
      'Automated Docker deployment framework with FastAPI enabling secure API calls for updates, achieving 99.9% uptime. A React.js + FastAPI Docker container monitoring web app with real-time controls — start/stop containers, view logs — accessible securely over Cloudflare Tunnel, eliminating the need for SSH or direct server access.',
    techStack: ['React', 'FastAPI', 'Docker', 'Cloudflare Tunnel'],
    image: 'https://images.unsplash.com/photo-1640552435388-a54879e72b28?w=1200&q=85',
    githubUrl: 'https://github.com/ashupal86',
  },
};

export async function generateStaticParams() {
  // Keystatic entries
  let keystatic: { slug: string }[] = [];
  try {
    const projects = await reader.collections.projects.all();
    keystatic = projects.map((p) => ({ slug: p.slug }));
  } catch {
    // Keystatic not configured — use static slugs
  }

  // Merge with static fallback slugs (deduplicating)
  const staticSlugs = Object.keys(STATIC_PROJECTS).map((slug) => ({ slug }));
  const all = [...keystatic, ...staticSlugs.filter((s) => !keystatic.find((k) => k.slug === s.slug))];
  return all;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try Keystatic first
  let project: {
    title: string;
    description: string;
    techStack?: string[];
    coverImage?: string | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
  } | null = null;

  try {
    const ksProject = await getProjectBySlug(slug);
    if (ksProject) {
      project = {
        title: ksProject.title,
        description: ksProject.description,
        techStack: ksProject.techStack ? [...ksProject.techStack] : [],
        coverImage: ksProject.coverImage,
        liveUrl: ksProject.liveUrl,
        githubUrl: ksProject.githubUrl,
      };
    }
  } catch {
    // Fall through to static
  }

  // Try static fallback
  if (!project && STATIC_PROJECTS[slug]) {
    const s = STATIC_PROJECTS[slug];
    project = {
      title: s.title,
      description: s.description,
      techStack: s.techStack,
      coverImage: s.image ?? null,
      liveUrl: s.liveUrl ?? null,
      githubUrl: s.githubUrl ?? null,
    };
  }

  if (!project) notFound();

  const techStack = project.techStack ?? [];

  return (
    <div className={styles.projectPage}>
      <div className={`container ${styles.headerContainer}`}>
        {/* Back link */}
        <Link href="/#projects" className={styles.backLink}>
          ← All Projects
        </Link>

        <div className={styles.meta}>
          <span className="label-uppercase">{techStack[0] || 'Project'}</span>
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>

        {/* Links */}
        <div className={styles.links}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View Live Site →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub Repository
            </a>
          )}
        </div>
      </div>

      {/* Cover image */}
      {project.coverImage && (
        <div className={styles.imageContainer}>
          <img src={project.coverImage} alt={project.title} className={styles.image} />
        </div>
      )}

      <div className={`container ${styles.contentContainer}`}>
        {/* Tech stack */}
        {techStack.length > 0 && (
          <div className={styles.techStack}>
            <h3 className="label-uppercase" style={{ marginBottom: '16px' }}>Technologies Used</h3>
            <div className={styles.tags}>
              {techStack.map((tech) => (
                <span key={tech} className={styles.tag}>{tech}</span>
              ))}
            </div>
          </div>
        )}

        {/* Long description placeholder */}
        <div className={styles.longDescription}>
          <p className={styles.descText}>
            Full case study coming soon. Add detailed content via the{' '}
            <a href="/keystatic" style={{ color: 'var(--color-m-light-blue)' }}>Keystatic admin</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
