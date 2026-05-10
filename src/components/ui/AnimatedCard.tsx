'use client';

/**
 * AnimatedCard — reusable card with:
 *  - Border-draw reveal using CSS clip-path on ::before/::after
 *  - Hover glow (CSS box-shadow)
 *  - Subtle hover tilt via JS mouse tracking
 *  - AOS animation on scroll entry (passed via data-aos prop)
 */
import { useRef } from 'react';
import styles from './AnimatedCard.module.css';

interface AnimatedCardProps {
  children: React.ReactNode;
  aosAnim?: string;          // e.g. 'fade-up', 'zoom-in'
  aosDelay?: number;         // ms delay for stagger
  aosDuration?: number;
  className?: string;
  tilt?: boolean;            // enable mouse tilt effect
}

export default function AnimatedCard({
  children,
  aosAnim = 'fade-up',
  aosDelay = 0,
  aosDuration = 900,
  className = '',
  tilt = true,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Max ±6deg tilt
    const rotX = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const rotY = ((e.clientX - cx) / (rect.width / 2)) * 6;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${className}`}
      data-aos={aosAnim}
      data-aos-delay={aosDelay}
      data-aos-duration={aosDuration}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* border-draw lines via pseudo-elements */}
      <div className={styles.borderTL} aria-hidden="true" />
      <div className={styles.borderBR} aria-hidden="true" />

      <div className={styles.inner}>{children}</div>
    </div>
  );
}
