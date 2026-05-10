import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  email?:       string;
  githubUrl?:   string;
  linkedinUrl?: string;
  twitterUrl?:  string;
  footerText?:  string;
}

export default function Footer({
  email       = 'palbro86@gmail.com',
  githubUrl   = 'https://github.com/ashupal86',
  linkedinUrl = 'https://linkedin.com/in/ashupal86',
  twitterUrl  = '',
  footerText  = `© ${new Date().getFullYear()} ASHISH PAL. ALL RIGHTS RESERVED.`,
}: FooterProps) {

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.divider} />
      <div className={`container ${styles.inner}`}>

        {/* Contact/Location Column */}
        <div className={styles.column}>
          <h4 className={styles.colTitle}>— LOCATION</h4>
          <p className={styles.colText}>
            Based in India.<br />
            Available for remote work globally.
          </p>
          <a href={`mailto:${email}`} className={styles.colLink}>
            {email}
          </a>
        </div>

        {/* Socials Column */}
        <div className={styles.column}>
          <h4 className={styles.colTitle}>— SOCIAL</h4>
          <nav className={styles.navGroup} aria-label="Social links">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                GitHub
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                LinkedIn
              </a>
            )}
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                Twitter
              </a>
            )}
          </nav>
        </div>

        {/* Navigation Column */}
        <div className={styles.column}>
          <h4 className={styles.colTitle}>— NAVIGATION</h4>
          <nav className={styles.navGroup} aria-label="Footer navigation">
            <Link href="#projects" className={styles.navLink}>Work</Link>
            <Link href="/blog"     className={styles.navLink}>Journal</Link>
            <Link href="#about"    className={styles.navLink}>About</Link>
            <Link href="/uses"     className={styles.navLink}>Uses</Link>
            <Link href="/resume"   className={styles.navLink}>Resume</Link>
            <Link href="/stash"    className={styles.navLink}>Stash</Link>
            <Link href="#contact"  className={styles.navLink}>Contact</Link>
          </nav>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            {footerText} <Link href="/secret" style={{ opacity: 0, cursor: 'default' }}>.</Link>
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms</Link>
            <a href="/sitemap.xml" className={styles.legalLink}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
