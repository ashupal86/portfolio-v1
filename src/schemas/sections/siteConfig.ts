/**
 * Site Config Schema
 * Global settings: name, email, social URLs, nav links, footer text.
 * This is the single source of truth for Navbar, Footer, ContactSection.
 */
import { fields, singleton } from '@keystatic/core';

export const siteConfigSchema = singleton({
  label: '🌐 Site Config',
  path: 'content/site-config',
  schema: {
    name: fields.text({
      label: 'Your Full Name',
      defaultValue: 'Ashish Pal',
      description: 'Used in the navbar logo and page titles.',
    }),
    title: fields.text({
      label: 'Site Title (SEO)',
      defaultValue: 'Ashish Pal — Full-Stack Developer & DevOps Engineer',
    }),
    tagline: fields.text({
      label: 'Short Tagline (SEO)',
      defaultValue: 'Crafting precision digital experiences.',
    }),
    description: fields.text({
      label: 'SEO Meta Description',
      defaultValue: 'Portfolio of Ashish Pal — Full-Stack Developer, DevOps Engineer & UI Architect.',
      multiline: true,
    }),
    email: fields.text({
      label: 'Contact Email',
      description: 'Shown in Contact section and Footer.',
    }),
    githubUrl: fields.url({ label: 'GitHub Profile URL' }),
    linkedinUrl: fields.url({ label: 'LinkedIn Profile URL' }),
    twitterUrl: fields.url({ label: 'Twitter / X Profile URL (optional)' }),
    resumeUrl: fields.url({
      label: 'Resume PDF URL',
      description: 'Leave blank to use /resume page.',
    }),
    navLinks: fields.array(
      fields.object({
        label: fields.text({ label: 'Link Label' }),
        href: fields.text({ label: 'Link Path or Hash' }),
      }),
      {
        label: 'Navigation Links',
        description: 'Navbar and mobile drawer links.',
        itemLabel: (p) => p.fields.label.value,
      }
    ),
    footerText: fields.text({
      label: 'Footer Copyright Text',
      defaultValue: '© 2025 ASHISH PAL. ALL RIGHTS RESERVED.',
    }),
  },
});
