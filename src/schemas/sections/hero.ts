/**
 * Hero Section Schema
 * Controls the cinematic hero area:
 * - Name displayed in large text
 * - Rotating typewriter roles
 * - Rotating taglines (below the roles)
 * - CTA button labels and URLs
 */
import { fields, singleton } from '@keystatic/core';

export const heroSchema = singleton({
  label: '🚀 Hero Section',
  path: 'content/hero',
  schema: {
    name: fields.text({
      label: 'Full Name',
      defaultValue: 'Ashish Pal',
      description: 'Displayed as large headline in the hero.',
    }),
    headline: fields.text({
      label: 'Sub-headline',
      defaultValue: 'Full-Stack Developer & DevOps Engineer',
      description: 'Short descriptor shown below the name.',
    }),
    roles: fields.array(
      fields.text({ label: 'Role' }),
      {
        label: 'Rotating Roles (typewriter effect)',
        description: 'These cycle through in the typewriter animation.',
        itemLabel: (p) => p.value,
      }
    ),
    taglines: fields.array(
      fields.text({ label: 'Tagline' }),
      {
        label: 'Rotating Taglines',
        description: 'These cycle below the roles — one shown at a time.',
        itemLabel: (p) => p.value,
      }
    ),
    primaryCta: fields.object(
      {
        label: fields.text({ label: 'Button Label', defaultValue: 'VIEW WORK' }),
        href: fields.text({ label: 'Button URL', defaultValue: '#projects' }),
      },
      { label: 'Primary CTA Button' }
    ),
    secondaryCta: fields.object(
      {
        label: fields.text({ label: 'Button Label', defaultValue: 'RESUME' }),
        href: fields.text({ label: 'Button URL', defaultValue: '/resume' }),
      },
      { label: 'Secondary CTA Button' }
    ),
    availableForWork: fields.checkbox({
      label: "Show 'Available for Work' badge",
      defaultValue: true,
    }),
  },
});
