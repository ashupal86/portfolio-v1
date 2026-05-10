import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from '../uses/uses.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ashish Pal',
  description: 'Privacy Policy for ashupal86.com',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '120px', paddingBottom: '120px' }}>
        <Link href="/" className={styles.back} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-neutral-400)', textDecoration: 'none', marginBottom: '40px' }}>
          <ArrowLeft size={16} />
          Back home
        </Link>
        <h1 className="headline-xl" style={{ marginBottom: '24px' }}>
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <div style={{ color: 'var(--color-neutral-300)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '16px' }}>Last updated: May 6, 2026</p>
          <p style={{ marginBottom: '16px' }}>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit my personal portfolio website.
          </p>
          <h2 className="headline-sm" style={{ marginTop: '40px', marginBottom: '16px', color: 'var(--color-neutral-100)' }}>1. Information I Collect</h2>
          <p style={{ marginBottom: '16px' }}>
            I do not actively collect personal data. However, standard website hosting analytics (such as IP addresses, browser types, and access times) may be collected automatically by the hosting provider (Vercel) to maintain site reliability and security.
          </p>
          <h2 className="headline-sm" style={{ marginTop: '40px', marginBottom: '16px', color: 'var(--color-neutral-100)' }}>2. Contact Information</h2>
          <p style={{ marginBottom: '16px' }}>
            If you choose to contact me via email, I will only use your email address to respond to your inquiry. I will not share, sell, or rent your email address to third parties.
          </p>
          <h2 className="headline-sm" style={{ marginTop: '40px', marginBottom: '16px', color: 'var(--color-neutral-100)' }}>3. External Links</h2>
          <p style={{ marginBottom: '16px' }}>
            This website contains links to external sites (like GitHub, LinkedIn, and live project demos). I am not responsible for the privacy practices or the content of those external websites.
          </p>
        </div>
      </div>
    </div>
  );
}
