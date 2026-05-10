'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

interface NavLink { label: string; href: string; }

interface NavbarProps {
  name?: string;
  navLinks?: NavLink[];
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'WORK',    href: '#projects' },
  { label: 'JOURNAL', href: '/blog' },
  { label: 'STASH',   href: '/stash' },
  { label: 'ABOUT',   href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar({ name = 'ASHISH PAL', navLinks = DEFAULT_LINKS }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Shrink + blur on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
        setMobileOpen(false);
    };
    if (mobileOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => href.startsWith('#') ? false : pathname === href;

  if (pathname?.startsWith('/keystatic')) {
    return null;
  }

  // Use ASHU as requested by user
  const logoMark = 'ASHU';

  const getResolvedHref = (href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Go to homepage">
            {logoMark}<span className={styles.logoDot}>.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) => {
              const resolvedHref = getResolvedHref(link.href);
              return (
                <Link
                  key={link.href}
                  href={resolvedHref}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className={styles.desktopCta}>
            <Link href="/resume" className="btn btn-primary btn-pill">RESUME</Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className={styles.mobileToggle}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && <div className={styles.overlay} aria-hidden="true" />}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        id="mobile-drawer"
        className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.drawerHeader}>
          <div className="m-stripe" />
        </div>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link, i) => {
            const resolvedHref = getResolvedHref(link.href);
            return (
              <Link
                key={link.href}
                href={resolvedHref}
                className={styles.drawerLink}
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/resume" className={`btn btn-primary ${styles.drawerCta}`} onClick={() => setMobileOpen(false)}>
            RESUME
          </Link>
        </nav>
      </div>
    </>
  );
}
