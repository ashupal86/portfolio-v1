'use client';

import { useEffect, useRef } from 'react';

// ASCII character ramp — darkest to lightest density
const CHAR_RAMP = '@#S%?*+;:,. ';
// Blue-ish tint matching M-Performance palette
const FG_COLOR = 'rgba(136, 177, 217, 0.75)'; // --color-m-light-blue

interface AsciiCanvasProps {
  src: string;
  fontSize?: number;
  className?: string;
}

export default function AsciiCanvas({ src, fontSize = 10, className }: AsciiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Offscreen canvas for sampling the image
  const offRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Create offscreen canvas to sample pixels
      const off = document.createElement('canvas');
      offRef.current = off;
      const offCtx = off.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      const render = () => {
        const W = canvas.offsetWidth;
        const H = canvas.offsetHeight;

        // Set canvas resolution to match display
        canvas.width = W;
        canvas.height = H;

        // How many character columns/rows fit
        const cols = Math.floor(W / fontSize);
        const rows = Math.floor(H / (fontSize * 1.8)); // chars are taller than wide

        // Scale image to grid size on offscreen canvas
        off.width = cols;
        off.height = rows;

        // Draw the image with grayscale filter into offscreen canvas
        offCtx.filter = 'grayscale(1) contrast(1.5) brightness(0.85)';
        offCtx.drawImage(img, 0, 0, cols, rows);

        const pixels = offCtx.getImageData(0, 0, cols, rows).data;

        // Floyd-Steinberg dither state
        const errors = new Float32Array(cols * rows);

        ctx.clearRect(0, 0, W, H);
        ctx.font = `${fontSize}px "Courier New", monospace`;
        ctx.textBaseline = 'top';

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const idx = (row * cols + col) * 4;
            // Average of R,G,B (already grayscale)
            const raw = pixels[idx] / 255; // 0..1
            // Apply accumulated error
            const adjusted = Math.max(0, Math.min(1, raw + errors[row * cols + col]));

            // Map to char ramp (inverted: bright→space, dark→@)
            const charIdx = Math.round((1 - adjusted) * (CHAR_RAMP.length - 1));
            const char = CHAR_RAMP[charIdx];

            // --- Floyd-Steinberg error diffusion ---
            const quantized = charIdx / (CHAR_RAMP.length - 1);
            const error = adjusted - (1 - quantized);

            if (col + 1 < cols)
              errors[row * cols + col + 1] += error * (7 / 16);
            if (row + 1 < rows) {
              if (col - 1 >= 0)
                errors[(row + 1) * cols + col - 1] += error * (3 / 16);
              errors[(row + 1) * cols + col] += error * (5 / 16);
              if (col + 1 < cols)
                errors[(row + 1) * cols + col + 1] += error * (1 / 16);
            }

            // Vary opacity slightly based on brightness for depth
            const alpha = 0.3 + adjusted * 0.7;
            ctx.fillStyle = FG_COLOR.replace('0.75', String(alpha.toFixed(2)));
            ctx.fillText(char, col * fontSize, row * fontSize * 1.8);
          }
        }
      };

      render();

      // Re-render on resize
      const ro = new ResizeObserver(() => render());
      ro.observe(canvas);
      return () => ro.disconnect();
    };

    img.onerror = () => {
      console.warn('AsciiCanvas: failed to load image', src);
    };
  }, [src, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
