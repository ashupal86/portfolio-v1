import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on web development, design systems, and the craft of building software.',
};

import { getPosts } from '@/lib/keystatic';
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function BlogPage() {
  const postsData = await getPosts();
  const posts = postsData.map((p) => ({
    slug: p.slug,
    title: p.entry.title,
    excerpt: p.entry.excerpt || '',
    date: p.entry.publishedDate || '',
    tags: p.entry.tags || [],
    readTime: `${p.entry.readTimeMinutes ?? 5} min read`,
  }));
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <Link href="/" className={styles.back}>
            <ArrowLeft size={16} />
            Back home
          </Link>
          <h1 className={`headline-xl ${styles.heading}`}>
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className={`body-lg ${styles.subheading}`}>
            Thoughts on web development, design systems, and the craft of building great software.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="container">
        <div className={styles.posts}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <div className={styles.postMeta}>
                  {post.date && (
                    <span className={`chip chip-lime ${styles.dateChip}`}>
                      {formatDate(post.date)}
                    </span>
                  )}
                  <span className={styles.readTime}>
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className={`headline-md ${styles.postTitle}`}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postTags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="chip chip-neutral">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
