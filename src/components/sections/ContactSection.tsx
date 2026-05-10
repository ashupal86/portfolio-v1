'use client';

import { useRef, useState } from 'react';
import { Send, Mail, Code2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import styles from './ContactSection.module.css';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

interface SiteConfig {
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function ContactSection({ siteConfig }: { siteConfig?: SiteConfig | null }) {
  // Merge CMS values with hardcoded fallbacks
  const email      = siteConfig?.email      || 'palbro86@gmail.com';
  const githubUrl  = siteConfig?.githubUrl  || 'https://github.com/ashupal86';
  const linkedinUrl = siteConfig?.linkedinUrl || 'https://linkedin.com/in/ashupal86';
  // Display handles
  const githubHandle   = githubUrl.replace(/https?:\/\/(www\.)?github\.com\//, '@');
  const linkedinHandle = linkedinUrl.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try emailing me directly.');
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`section ${styles.contact} ${inView ? styles.visible : ''}`}
      aria-label="Contact"
    >
      {/* Background gradient */}
      <div className={styles.bgGradient} aria-hidden="true" />

      <div className="container">
        <div className={styles.grid}>
          {/* Left Info */}
          <div className={styles.info}>
            <div className="section-header">
              <p className="section-label">Get In Touch</p>
              <h2 className={`headline-lg ${styles.heading}`}>
                Let&apos;s build something{' '}
                <span className="gradient-text">amazing</span>
              </h2>
            </div>
            <p className={`body-lg ${styles.desc}`}>
              Have a project in mind? Looking for a developer to join your team?
              Or just want to say hi? My inbox is always open.
            </p>

            <div className={styles.contactLinks}>
              <a
                href={`mailto:${email}`}
                className={styles.contactLink}
                id="contact-email-link"
              >
                <div className={styles.contactIcon}>
                  <Mail size={18} strokeWidth={2} />
                </div>
                <div>
                  <span className={`label-caps ${styles.contactLabel}`}>Email</span>
                  <span className={styles.contactValue}>{email}</span>
                </div>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <div className={styles.contactIcon}>
                  <Code2 size={18} strokeWidth={2} />
                </div>
                <div>
                  <span className={`label-caps ${styles.contactLabel}`}>GitHub</span>
                  <span className={styles.contactValue}>{githubHandle}</span>
                </div>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <div className={styles.contactIcon}>
                  <Mail size={18} strokeWidth={2} />
                </div>
                <div>
                  <span className={`label-caps ${styles.contactLabel}`}>LinkedIn</span>
                  <span className={styles.contactValue}>{linkedinHandle}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className={styles.formWrapper}>
            {status === 'success' ? (
              <div className={styles.successMsg} role="status">
                <div className={styles.successIcon}>✓</div>
                <h3 className="headline-md">Message sent!</h3>
                <p>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setStatus('idle')}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                aria-label="Contact form"
              >
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={`label-caps ${styles.label}`}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className={styles.input}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={`label-caps ${styles.label}`}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className={styles.input}
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={`label-caps ${styles.label}`}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    className={styles.textarea}
                    disabled={status === 'loading'}
                  />
                </div>

                {error && (
                  <p className={styles.errorMsg} role="alert">{error}</p>
                )}

                <button
                  type="submit"
                  id="contact-submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
