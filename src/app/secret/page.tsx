'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './secret.module.css';

export default function SecretPage() {
  const [lines, setLines] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const script = [
    "Initializing dev mode...",
    "Accessing hidden sector [7.A.4]...",
    "Authentication bypass successful.",
    "Welcome to the Easter Egg.",
    "Fun Fact from ASHU: 'Skateboard dost ka hai 😁'",
    "Type 'exit' to return to normal browsing.",
    "> "
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < script.length) {
        setLines(prev => [...prev, script[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.terminalContainer}>
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={16} /> Exit Terminal
      </Link>
      <div className={styles.terminal} ref={terminalRef}>
        <div className={styles.header}>
          <span className={styles.dot} style={{ background: '#ff5f56' }} />
          <span className={styles.dot} style={{ background: '#ffbd2e' }} />
          <span className={styles.dot} style={{ background: '#27c93f' }} />
          <span className={styles.title}>ashu@portfolio:~</span>
        </div>
        <div className={styles.body}>
          {lines.map((line, i) => (
            <div key={i} className={styles.line}>{line}</div>
          ))}
          <span className={styles.cursor} />
        </div>
      </div>
    </div>
  );
}
