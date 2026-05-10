'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useInView } from '../hooks/useInView';
import styles from './ProjectsSection.module.css';

interface Project {
  slug: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
}

/**
 * HoverPortal — renders a floating <img> tag directly in document.body via React Portal.
 * Using <img> instead of CSS background-image avoids any CSP / CSS specificity issues.
 * position:fixed means it is NEVER clipped by parent overflow or stacking context.
 */
function HoverPortal({ src, x, y, title }: { src: string; x: number; y: number; title: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: x + 28,
        top: Math.max(10, y - 120),
        width: 280,
        height: 175,
        zIndex: 99999,
        pointerEvents: 'none',
        border: '1px solid rgba(255,255,255,0.15)',
        overflow: 'hidden',
        animation: 'hoverReveal 0.18s ease forwards',
      }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>,
    document.body
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  const onLeave = useCallback(() => setCursor(null), []);

  return (
    <div
      className={styles.projectRow}
      onMouseMove={project.image ? onMove : undefined}
      onMouseLeave={onLeave}
    >
      <Link href={`/projects/${project.slug}`} className={styles.rowLink}>
        <span className={styles.rowIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={styles.rowMain}>
          <h3 className={styles.rowTitle}>{project.title}</h3>
          {project.category && (
            <span className={styles.rowCategory}>{project.category}</span>
          )}
        </div>

        <p className={styles.rowDesc}>{project.description}</p>

        <span className={styles.rowArrow}>→</span>
      </Link>

      {/* Portal-rendered hover preview — in document.body, never clipped */}
      {project.image && cursor && (
        <HoverPortal
          src={project.image}
          x={cursor.x}
          y={cursor.y}
          title={project.title}
        />
      )}
    </div>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.05 });

  return (
    <section
      id="projects"
      ref={ref}
      className={`section ${styles.projects} ${inView ? styles.visible : ''}`}
      aria-label="Related Work"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.minimalIcon}>+</span>
          <h2 className="label-uppercase">Related Work</h2>
        </div>

        <div className={styles.list}>
          {projects.length === 0 ? (
            <p className="detail-mono" style={{ color: 'var(--color-text-dim)' }}>
              No projects yet. Add them via the Keystatic admin panel.
            </p>
          ) : (
            projects.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
