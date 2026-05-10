'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ dx: 0.5, dy: 0.5 });

  useEffect(() => {
    let animationFrame: number;
    
    const updatePosition = () => {
      setPosition((prev) => {
        let newX = prev.x + velocity.dx;
        let newY = prev.y + velocity.dy;
        let newDx = velocity.dx;
        let newDy = velocity.dy;

        if (newX <= 0 || newX >= 90) newDx = -newDx;
        if (newY <= 0 || newY >= 90) newDy = -newDy;

        if (newX <= 0 || newX >= 90 || newY <= 0 || newY >= 90) {
            setVelocity({ dx: newDx, dy: newDy });
        }

        return { x: newX, y: newY };
      });
      animationFrame = requestAnimationFrame(updatePosition);
    };

    animationFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [velocity]);

  return (
    <div className={styles.container}>
      {/* Background Grid */}
      <div className={styles.gridOverlay} />

      <div 
        className={styles.bouncingLogo}
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      >
        404
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>PAGE NOT FOUND</h1>
        <p className={styles.description}>
          The endpoint you requested could not be located on this server.
        </p>
        <Link href="/" className="btn btn-primary btn-pill" style={{ marginTop: '32px' }}>
          <ArrowLeft size={16} /> RETURN HOME
        </Link>
      </div>
    </div>
  );
}
