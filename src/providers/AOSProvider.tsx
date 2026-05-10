'use client';

/**
 * AOSProvider — initializes AOS on mount and re-inits on route changes.
 * Placed in layout so it covers all pages without modifying each section.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AOSProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamic import keeps AOS out of the SSR bundle
    import('aos').then(({ default: AOS }) => {
      import('aos/dist/aos.css');
      AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: false,          // re-animate on scroll back up
        mirror: true,         // animate out when scrolling past
        offset: 80,           // trigger 80px before element enters viewport
        disable: () =>
          window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    });
  }, [pathname]); // re-init on every route change

  return null; // renders nothing, just initializes AOS
}
