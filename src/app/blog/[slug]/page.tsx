import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Tag, User } from 'lucide-react';
import { getProjectBySlug, getPosts } from '@/lib/keystatic';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/blog/MDXComponents';
import styles from './post.module.css';

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.entry.title,
    description: post.entry.excerpt || `Read about ${post.entry.title}`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get raw MDX string from the body field
  const content = await post.entry.body();

  return (
    <article className={styles.page}>
      <div className="container">
        {/* Post Header */}
        <header className={styles.header}>
          <Link href="/blog" className={styles.back}>
            <ArrowLeft size={16} />
            Back to posts
          </Link>
          
          <div className={styles.tags}>
            {post.entry.tags?.map((tag) => (
              <span key={tag} className="chip chip-blue">{tag}</span>
            ))}
          </div>

          <h1 className={`headline-xl ${styles.title}`}>
            {post.entry.title}
          </h1>
          
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <User size={16} />
              <span className="detail-mono">ASHISH PAL</span>
            </div>
            <span className={styles.metaDot} aria-hidden="true" />
            <div className={styles.metaItem}>
              <Calendar size={16} />
              <span className="detail-mono">
                {post.entry.publishedDate 
                  ? new Date(post.entry.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : 'Recent'
                }
              </span>
            </div>
            <span className={styles.metaDot} aria-hidden="true" />
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span className="detail-mono">{post.entry.readTimeMinutes ?? 5} min read</span>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div className={styles.content}>
          <div className={styles.prose}>
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </div>
      </div>
    </article>
  );
}
