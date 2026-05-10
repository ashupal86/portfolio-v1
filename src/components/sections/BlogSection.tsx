'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '../hooks/useInView';
import styles from './BlogSection.module.css';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;       // ISO date string
  readTime?: string;  // e.g. "06 MIN"
  excerpt?: string;
}

// fallback posts removed to enforce CMS usage

function formatDate(iso: string) {
  try {
    return new Date(iso)
      .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      .toUpperCase();
  } catch {
    return iso;
  }
}

export default function BlogSection({ posts }: { posts?: BlogPost[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.05 });

  // Use CMS posts
  const displayPosts = (posts && posts.length > 0) ? posts : [];

  return (
    <section
      id="blog"
      ref={ref}
      className={`section ${styles.blog} ${inView ? styles.visible : ''}`}
      aria-label="Journal"
    >
      <div className="container">

        {/* Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.minimalIcon}>+</span>
          <h2 className="label-uppercase">Journal</h2>
        </div>

        <div className={styles.list}>
          {displayPosts.map((post) => (
            <article key={post.slug} className={styles.postItem}>
              <Link
                href={`/blog/${post.slug}`}
                className={styles.postLink}
                aria-label={`Read: ${post.title}`}
              >
                <div className={styles.meta}>
                  <span className={styles.date}>{formatDate(post.date)}</span>
                  {post.readTime && (
                    <span className={styles.readTime}>{post.readTime}</span>
                  )}
                </div>
                <h3 className={styles.title}>{post.title}</h3>
                <span className={styles.readMore}>[ READ ]</span>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
