'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, MapPin, Mail, Globe, Phone } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import styles from './resume.module.css';

const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contributions', label: 'Contributions' },
];

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState('summary');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0% -70% 0%' }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <div className="container">
        
        {/* Navigation / TOC */}
        <aside className={styles.sidebar}>
          <Link href="/" className={styles.back}>
            <ArrowLeft size={16} /> Back
          </Link>
          <nav className={styles.toc}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`${styles.tocItem} ${activeSection === s.id ? styles.active : ''}`}
                onClick={() => scrollToSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <a href="/resume.pdf" download className={styles.downloadBtn}>
            <Download size={16} /> Download PDF
          </a>
          <a 
            href="https://docs.google.com/document/d/1KuVv5h7r2wk0rPpHwkI9uRR0k2iwEkOd62S5MvmUPhE/edit?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.updateLink}
          >
            Update Resume (Google Docs)
          </a>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          
          {/* Header */}
          <header id="summary" ref={(el) => { sectionRefs.current['summary'] = el; }} className={styles.resumeHeader}>
            <h1 className="headline-xl">ASHISH <span className="gradient-text">PAL</span></h1>
            <p className={styles.title}>Backend-Focused Developer | DevOps Exposure | B.Tech CSE</p>
            
            <div className={styles.contactInfo}>
              <span className={styles.contactItem}><Mail size={14} /> palbro86@gmail.com</span>
              <span className={styles.contactItem}><FiGithub size={14} /> github.com/ashupal86</span>
              <span className={styles.contactItem}><Globe size={14} /> ashu.devinit.in</span>
              <span className={styles.contactItem}><MapPin size={14} /> Greater Noida, UP</span>
            </div>
            
            <p className={styles.summaryText}>
              Self-taught developer with 3+ years of hands-on learning. Strong in Python backend development (FastAPI, Flask), 
              containerization with Docker, and Linux-based workflows. Currently focused on building production-grade 
              applications and evaluating infrastructure scalability.
            </p>
          </header>

          {/* Experience */}
          <section id="experience" ref={(el) => { sectionRefs.current['experience'] = el; }} className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <h3>DevOps Intern</h3>
                  <span className={styles.date}>Aug 2025 – Jan 2026</span>
                </div>
                <p className={styles.company}>Springer Capital, Chicago (Remote)</p>
                <ul className={styles.list}>
                  <li>Collaborating with the backend team to build and deliver client-focused solutions.</li>
                  <li>Researching and implementing DevOps best practices across infrastructure and deployment workflows.</li>
                  <li>Setting up and testing monitoring stacks using Grafana and Alloy.</li>
                  <li>Evaluating load balancers (NGINX Proxy vs HAProxy) for performance and scalability.</li>
                  <li>Working with Redis for caching and performance optimization.</li>
                  <li>Containerizing applications to streamline deployment and environment management.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" ref={(el) => { sectionRefs.current['projects'] = el; }} className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.projectGrid}>
              <div className={styles.projectCard}>
                <h3>GraminStore</h3>
                <p className={styles.techStack}>React, FastAPI, WebSockets, PostgreSQL, Docker</p>
                <p>A web app offering quick commerce for consumers with a "pay later" feature, while also empowering merchants to manage customers, books, and inventory efficiently.</p>
              </div>
              <div className={styles.projectCard}>
                <h3>Safe Query AI</h3>
                <p className={styles.techStack}>FastAPI, SQLAdmin, PostgreSQL, React, Node.js</p>
                <p>Enables analytical decision-making via natural language queries while protecting live data. Features administrative approval and AI agents verifying data safety.</p>
              </div>
              <div className={styles.projectCard}>
                <h3>Bot-Web</h3>
                <p className={styles.techStack}>React, FastAPI, Docker, Cloudflare Tunnel</p>
                <p>Automated Docker deployment framework with real-time container monitoring and controls, accessible securely without SSH.</p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" ref={(el) => { sectionRefs.current['skills'] = el; }} className={styles.section}>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillGroup}>
                <h4>Languages</h4>
                <div className={styles.tags}>
                  <span>Python</span><span>Java</span><span>JavaScript</span><span>SQL</span><span>HTML/CSS</span>
                </div>
              </div>
              <div className={styles.skillGroup}>
                <h4>Frameworks & Tools</h4>
                <div className={styles.tags}>
                  <span>FastAPI</span><span>Flask</span><span>ReactJS</span><span>Docker</span><span>Terraform</span><span>Proxmox</span><span>Git</span>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section id="education" ref={(el) => { sectionRefs.current['education'] = el; }} className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.educationItem}>
              <h3>B.Tech in Computer Science Engineering</h3>
              <p>Noida Institute of Engineering and Technology (NIET)</p>
              <div className={styles.timelineHeader}>
                <span>Greater Noida, UP</span>
                <span className={styles.date}>2022 – 2026</span>
              </div>
              <p className={styles.cgpa}>CGPA: 6.5 / 10</p>
            </div>
          </section>

          {/* Certifications */}
          <section id="certifications" ref={(el) => { sectionRefs.current['certifications'] = el; }} className={styles.section}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            <ul className={styles.simpleList}>
              <li>Python (Basic) — HackerRank</li>
              <li>Java (Basic) — HackerRank</li>
              <li>Google Cloud Computing Foundations — Google Cloud</li>
              <li>BharatXR Certificate of Recognition</li>
            </ul>
          </section>

          {/* Contributions */}
          <section id="contributions" ref={(el) => { sectionRefs.current['contributions'] = el; }} className={styles.section}>
            <h2 className={styles.sectionTitle}>Leadership & Contributions</h2>
            <ul className={styles.list}>
              <li>Technical Head, Ekume Club – NIET (2024–Present).</li>
              <li>Speaker, Deployment Workshop using Docker & Render – NIET Campus.</li>
              <li>Organized 5+ events including Ted talks, webinars, and coding competitions.</li>
            </ul>
          </section>

        </main>
      </div>
    </div>
  );
}
