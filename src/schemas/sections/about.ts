/**
 * About Section Schema
 * Controls the "Experience & Skills" section:
 * - Bio text
 * - Experience entries (company, role, date, description)
 * - Skill categories with items
 * - Awards / achievements list
 */
import { fields, singleton } from '@keystatic/core';

export const aboutSchema = singleton({
  label: '👤 About Section',
  path: 'content/about',
  schema: {
    heading: fields.text({
      label: 'Section Heading',
      defaultValue: 'Experience & Skills',
    }),
    bio: fields.document({
      label: 'Bio (Rich Text)',
      formatting: true,
      links: true,
      description: 'Your professional bio paragraph.',
    }),
    profileImage: fields.image({
      label: 'Profile Photo',
      directory: 'public/images',
      publicPath: '/images',
    }),

    // ── Experience Timeline ────────────────────────────────────────────────
    experience: fields.array(
      fields.object({
        company: fields.text({ label: 'Company / Organization' }),
        role: fields.text({ label: 'Role / Title' }),
        period: fields.text({ label: 'Period (e.g. Aug 2025 – Present)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        location: fields.text({
          label: 'Location (optional)',
          description: 'e.g. Remote, Chicago IL',
        }),
      }),
      {
        label: 'Experience',
        description: 'Work experience entries shown in the timeline.',
        itemLabel: (p) => `${p.fields.role.value} @ ${p.fields.company.value}`,
      }
    ),

    // ── Skills Grid ────────────────────────────────────────────────────────
    skills: fields.array(
      fields.object({
        category: fields.text({ label: 'Category (e.g. Frontend)' }),
        items: fields.array(fields.text({ label: 'Skill' }), {
          label: 'Skills',
          itemLabel: (p) => p.value,
        }),
      }),
      {
        label: 'Skill Categories',
        description: 'Grouped skill sets shown in the skills grid.',
        itemLabel: (p) => p.fields.category.value,
      }
    ),

    // ── Awards ────────────────────────────────────────────────────────────
    awards: fields.array(
      fields.object({
        title: fields.text({ label: 'Award / Achievement Title' }),
        description: fields.text({ label: 'Details', multiline: true }),
        year: fields.text({ label: 'Year' }),
      }),
      {
        label: 'Awards & Achievements',
        itemLabel: (p) => p.fields.title.value,
      }
    ),

    // ── Education ─────────────────────────────────────────────────────────
    education: fields.array(
      fields.object({
        degree: fields.text({ label: 'Degree' }),
        institution: fields.text({ label: 'Institution' }),
        location: fields.text({ label: 'Location' }),
        status: fields.text({ label: 'Status' }),
        cgpa: fields.text({ label: 'CGPA' }),
      }),
      {
        label: 'Education',
        itemLabel: (p) => p.fields.degree.value,
      }
    ),

    // ── Certifications ─────────────────────────────────────────────────────
    certifications: fields.array(
      fields.object({
        title: fields.text({ label: 'Title' }),
        issuer: fields.text({ label: 'Issuer' }),
        year: fields.text({ label: 'Year' }),
      }),
      {
        label: 'Certifications',
        itemLabel: (p) => p.fields.title.value,
      }
    ),

    // ── Currently Learning ────────────────────────────────────────────────
    currentlyLearning: fields.array(
      fields.text({ label: 'Topic' }),
      {
        label: 'Currently Learning',
        itemLabel: (p) => p.value,
      }
    ),

    // ── Core Strengths ────────────────────────────────────────────────────
    coreStrengths: fields.array(
      fields.text({ label: 'Strength' }),
      {
        label: 'Core Strengths',
        itemLabel: (p) => p.value,
      }
    ),

    // ── Fun Fact ──────────────────────────────────────────────────────────
    funFact: fields.text({
      label: 'Fun Fact',
      multiline: true,
    }),
  },
});
