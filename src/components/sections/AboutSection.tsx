'use client';

import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { TechIcon } from '../ui/TechIcon';
import { DocumentRenderer } from '@keystatic/core/renderer';
import styles from './AboutSection.module.css';

// defaults removed to enforce CMS usage

interface AboutData {
  profileImage?: string;
  bio?: any;
  experience: { role: string; company: string; date: string; description: string }[];
  skills: { category: string; items: string[] }[];
  education?: { degree: string; institution: string; location: string; status: string; cgpa: string }[];
  certifications?: { title: string; issuer: string; year: string }[];
  currentlyLearning?: string[];
  coreStrengths?: string[];
}

export default function AboutSection({ data }: { data?: AboutData | null }) {
  const EXPERIENCES = (data?.experience?.length) ? data.experience : [];
  const SKILLS = (data?.skills?.length) ? data.skills : [];
  const BIO = data?.bio;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className={`section ${styles.about} ${inView ? styles.visible : ''}`}
      aria-label="Experience"
    >
      <div className="container">
        
        {/* Bio Section with Profile Image */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '64px' }}>
          {data?.profileImage && (
            <div style={{ flexShrink: 0, width: '200px', height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-neutral-800)' }}>
              <img src={data.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          {BIO && (
            <div style={{ maxWidth: '800px' }}>
              <div style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--color-neutral-300)' }}>
                <DocumentRenderer document={BIO.value} />
              </div>
            </div>
          )}
        </div>
        
        {/* Experience Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.minimalIcon}>+</span>
          <h2 className="label-uppercase">Experience</h2>
        </div>

        {/* Experience List */}
        <div className={styles.experienceList}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className={styles.experienceItem}>
              <div className={styles.expHeader}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.date}>{exp.date}</span>
              </div>
              <p className={styles.company}>{exp.company}</p>
              <p className={styles.description}>{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Proficiency Header */}
        <div className={styles.sectionHeader} style={{ marginTop: '96px' }}>
          <span className={styles.minimalIcon}>+</span>
          <h2 className="label-uppercase">Technical Proficiency</h2>
        </div>
        
        <div className={styles.divider} />

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {SKILLS.map((group) => (
            <div key={group.category} className={styles.skillCol}>
              <h4 className={styles.skillCategory}>— {group.category}</h4>
              <ul className={styles.skillList}>
                {group.items.map((skill) => (
                  <li key={skill} className={styles.skillItem} style={{ display: 'flex', alignItems: 'center' }}>
                    <TechIcon name={skill} className={styles.techIcon} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Core Strengths Header */}
        {data?.coreStrengths && data.coreStrengths.length > 0 && (
          <>
            <div className={styles.sectionHeader} style={{ marginTop: '96px' }}>
              <span className={styles.minimalIcon}>+</span>
              <h2 className="label-uppercase">Core Strengths</h2>
            </div>
            <div className={styles.experienceList}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {data.coreStrengths.map((strength, i) => (
                  <li key={i} style={{ marginBottom: '12px', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'var(--lime-glow)', marginRight: '12px' }}>▹</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Education Header */}
        {data?.education && data.education.length > 0 && (
          <>
            <div className={styles.sectionHeader} style={{ marginTop: '96px' }}>
              <span className={styles.minimalIcon}>+</span>
              <h2 className="label-uppercase">Education</h2>
            </div>
            <div className={styles.experienceList}>
              {data.education.map((edu, i) => (
                <div key={i} className={styles.experienceItem}>
                  <div className={styles.expHeader}>
                    <h3 className={styles.role}>{edu.degree}</h3>
                    <span className={styles.date}>{edu.status}</span>
                  </div>
                  <p className={styles.company}>{edu.institution} — {edu.location}</p>
                  <p className={styles.description}>CGPA: {edu.cgpa}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Certifications & Learning */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginTop: '96px' }}>
          {data?.certifications && data.certifications.length > 0 && (
            <div>
              <div className={styles.sectionHeader}>
                <span className={styles.minimalIcon}>+</span>
                <h2 className="label-uppercase">Certifications</h2>
              </div>
              <ul className={styles.skillList}>
                {data.certifications.map((cert, i) => (
                  <li key={i} className={styles.skillItem} style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{cert.title}</span>
                    <span style={{ color: 'var(--color-neutral-400)', fontSize: '0.9rem' }}>{cert.issuer} • {cert.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data?.currentlyLearning && data.currentlyLearning.length > 0 && (
            <div>
              <div className={styles.sectionHeader}>
                <span className={styles.minimalIcon}>+</span>
                <h2 className="label-uppercase">Currently Learning</h2>
              </div>
              <ul className={styles.skillList}>
                {data.currentlyLearning.map((topic, i) => (
                  <li key={i} className={styles.skillItem} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'var(--lime-glow)', marginRight: '12px' }}>▹</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
