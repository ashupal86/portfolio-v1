'use client';

import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const BOOT_LINES = [
  'INITIALIZING PORTFOLIO...',
  'LOADING MODULES............',
  'CONNECTING TO SYSTEMS......',
  'ASHISH PAL // FULL-STACK + DEVOPS',
  'READY.',
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Don't show again in same session
    if (sessionStorage.getItem('portfolio-loaded')) {
      setVisible(false);
      return;
    }

    // Animate boot lines
    let lineTimeout: NodeJS.Timeout;
    const showNextLine = (index: number) => {
      if (index < BOOT_LINES.length) {
        setLineIndex(index);
        setProgress(Math.round((index / (BOOT_LINES.length - 1)) * 100));
        lineTimeout = setTimeout(() => showNextLine(index + 1), 340);
      } else {
        // All lines shown — exit
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem('portfolio-loaded', '1');
          }, 700);
        }, 400);
      }
    };

    showNextLine(0);
    return () => clearTimeout(lineTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${exiting ? styles.exit : ''}`} aria-live="polite" role="status">
      {/* Top-left badge */}
      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        <span className={styles.badgeText}>BOOT SEQUENCE</span>
      </div>

      {/* Centre content */}
      <div className={styles.centre}>
        {/* M stripe */}
        <div className={styles.stripe} />

        {/* Name */}
        <div className={styles.nameBlock}>
          <span className={styles.nameLabel}>ASHISH PAL</span>
          <span className={styles.nameAka}>aka ASHU</span>
        </div>

        {/* Boot lines */}
        <div className={styles.terminal} aria-hidden="true">
          {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
            <div
              key={i}
              className={`${styles.termLine} ${i === lineIndex ? styles.active : styles.done}`}
            >
              <span className={styles.prompt}>&gt; </span>
              {line}
              {i === lineIndex && <span className={styles.blink}>_</span>}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.progressLabel}>{progress}%</span>
      </div>

      {/* Bottom right version */}
      <div className={styles.version}>
        <span>v2025.05 — M-PERFORMANCE BUILD</span>
      </div>
    </div>
  );
}
