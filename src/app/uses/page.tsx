import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './uses.module.css';

export const metadata: Metadata = {
  title: 'Uses | Ashish Pal',
  description: 'A curated list of the hardware, software, and tools I use on a daily basis.',
};

const CATEGORIES = [
  {
    title: 'Hardware & Setup',
    items: [
      { name: 'Desktop (Primary)', description: 'AMD Ryzen 7 9700X, RTX 4060, 32GB RAM, B650 Gaming X AX V2' },
      { name: 'Laptop (Fedora Dev)', description: 'Lenovo IdeaPad Slim 3 (i3 10th gen, 12GB RAM)' },
      { name: 'Monitor', description: 'Samsung Odyssey 27" 1080p, 165Hz' },
      { name: 'Keyboard', description: 'EvoFox Ronin TKL Wireless' },
      { name: 'Mouse', description: 'Offbeat Gaming Mouse Wireless' },
      { name: 'Audio', description: 'KZ Gale IEM & SpinBot HX300 Headphones' },
    ],
  },
  {
    title: 'Development Tools',
    items: [
      { name: 'IDEs', description: 'VS Code, Antigravity, Zed, Cursor' },
      { name: 'Databases', description: 'PostgreSQL, Supabase, Qdrant (RAG DB), Neo4j' },
      { name: 'Systems', description: 'Ubuntu (Main Dev), Fedora (Laptop Dev), Windows (Gaming/College)' },
      { name: 'Docker', description: 'For containerized local environments' },
      { name: 'Git & GitHub', description: 'Version control and CI/CD' },
    ],
  },
  {
    title: 'Software & Productivity',
    items: [
      { name: 'Notes', description: 'Self-made note-taking application' },
      { name: 'Music', description: 'Apple Music' },
      { name: 'Software Philosophy', description: 'Mostly open-source and free tools' },

    ],
  },
];

export default function UsesPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/" className={styles.back}>
          <ArrowLeft size={16} />
          Back home
        </Link>
        <h1 className={`headline-xl ${styles.heading}`}>
          What I <span className="gradient-text">Use</span>
        </h1>
        <p className={`body-lg ${styles.subheading}`}>
          A curated list of the hardware, software, and gear I use on a daily basis for development and design.
        </p>

        <div className={styles.content}>
          {CATEGORIES.map((category) => (
            <div key={category.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <ul className={styles.itemList}>
                {category.items.map((item) => (
                  <li key={item.name} className={styles.item}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
