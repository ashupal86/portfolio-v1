'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

// removed defaults to enforce CMS usage

export default function HeroSection({
  roles: rolesProp,
  taglines: taglinesProp,
  name,
  formalIntro,
}: {
  roles?: string[];
  taglines?: string[];
  name?: string;
  formalIntro?: string;
}) {
  const ROLES    = (rolesProp    && rolesProp.length    > 0) ? rolesProp    : ['DEVELOPER'];
  const TAGLINES = (taglinesProp && taglinesProp.length > 0) ? taglinesProp : ['BUILDING SOFTWARE'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineFade, setTaglineFade] = useState(true);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let t: NodeJS.Timeout;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
    else
      t = setTimeout(() => { setDeleting(false); setRoleIndex(i => (i + 1) % ROLES.length); }, 50);
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      setTaglineFade(false);
      setTimeout(() => { setTaglineIndex(i => (i + 1) % TAGLINES.length); setTaglineFade(true); }, 400);
    }, 3500);
    return () => clearInterval(id);
  }, [TAGLINES.length]);

  return (
    <section id="hero" className={styles.hero} aria-label="Hero">

      {/* ── Background image layer ─────────────── */}
      <div className={styles.bgImage} aria-hidden="true" />

      {/* ── Gradient overlays for text legibility ─ */}
      <div className={styles.overlayBottom} aria-hidden="true" />
      <div className={styles.overlayTop}    aria-hidden="true" />
      <div className={styles.overlayLeft}   aria-hidden="true" />

      {/* ── Foreground text ───────────────────── */}
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          {/* Meta row */}
          <div className={styles.metaRow}>
            <span className={styles.metaText}>INDIA, ASIA</span>
            <span className={styles.metaDot} />
            <span className={styles.metaText}>B.TECH CSE · 2022–2026</span>
            <span className={styles.metaDot} />
            <span className={styles.metaText}>GMT +5:30</span>
          </div>

          {/* Name */}
          <h1 className={styles.name}>{name || 'ASHISH PAL'}</h1>

          {/* Typewriter role */}
          <h2 className={styles.role}>
            {displayed}
            <span className={styles.cursor} aria-hidden="true">|</span>
          </h2>

          {/* Tagline + CTAs */}
          <motion.div
            className={styles.lowerRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className={styles.taglineRow}>
              <div className={styles.blueBox} />
              <span
                className={`label-uppercase ${styles.tagline}`}
                style={{ opacity: taglineFade ? 1 : 0 }}
              >
                {TAGLINES[taglineIndex]}
              </span>
            </div>

            <div className={styles.ctaRow}>
              <a href="#projects" className={styles.ctaPrimary}>
                VIEW WORK <span className={styles.ctaArrow}>→</span>
              </a>
              <a href="/resume" className={styles.ctaGhost}>RESUME</a>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
