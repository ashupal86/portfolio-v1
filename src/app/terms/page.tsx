import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from '../uses/uses.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | Ashish Pal',
  description: 'Terms of Service for ashupal86.com',
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '120px', paddingBottom: '120px' }}>
        <Link href="/" className={styles.back} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-neutral-400)', textDecoration: 'none', marginBottom: '40px' }}>
          <ArrowLeft size={16} />
          Back home
        </Link>
        <h1 className="headline-xl" style={{ marginBottom: '24px' }}>
          Terms of <span className="gradient-text">Service</span>
        </h1>
        <div style={{ color: 'var(--color-neutral-300)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '16px' }}>Last updated: May 6, 2026</p>
          <h2 className="headline-sm" style={{ marginTop: '40px', marginBottom: '16px', color: 'var(--color-neutral-100)' }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: '16px' }}>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          <h2 className="headline-sm" style={{ marginTop: '40px', marginBottom: '16px', color: 'var(--color-neutral-100)' }}>2. Intellectual Property</h2>
          <p style={{ marginBottom: '16px' }}>
            The content, design, and source code of this portfolio are the intellectual property of Ashish Pal, except where explicitly stated (such as open-source libraries or third-party assets). Feel free to draw inspiration, but please do not directly clone the design or content without attribution.
          </p>
          <h2 className="headline-sm" style={{ marginTop: '40px', marginBottom: '16px', color: 'var(--color-neutral-100)' }}>3. Disclaimer</h2>
          <p style={{ marginBottom: '16px' }}>
            The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
        </div>
      </div>
    </div>
  );
}
