import { fields, singleton } from '@keystatic/core';

export const resumeSchema = singleton({
  label: '📄 Resume',
  path: 'content/resume',
  format: 'json',
  schema: {
    summary: fields.text({
      label: 'Summary',
      multiline: true,
      description: 'The professional summary at the top of the resume.',
    }),
    experience: fields.array(
      fields.object({
        role: fields.text({ label: 'Role / Job Title' }),
        period: fields.text({ label: 'Time Period' }),
        company: fields.text({ label: 'Company & Location' }),
        bullets: fields.array(fields.text({ label: 'Bullet Point' }), {
          label: 'Responsibilities / Achievements',
          itemLabel: (props) => props.value,
        }),
      }),
      { label: 'Experience', itemLabel: (props) => `${props.fields.role.value} at ${props.fields.company.value}` }
    ),
    projects: fields.array(
      fields.object({
        title: fields.text({ label: 'Project Name' }),
        description: fields.text({ label: 'Description', multiline: true }),
        techLine: fields.text({ label: 'Technologies (e.g., React · FastAPI)' }),
      }),
      { label: 'Projects', itemLabel: (props) => props.fields.title.value }
    ),
    skills: fields.array(
      fields.object({
        category: fields.text({ label: 'Category Name (e.g., LANGUAGES)' }),
        list: fields.text({ label: 'Skills List (e.g., Python · Java)' }),
      }),
      { label: 'Skills', itemLabel: (props) => props.fields.category.value }
    ),
    education: fields.array(
      fields.object({
        degree: fields.text({ label: 'Degree / Program' }),
        period: fields.text({ label: 'Time Period' }),
        institution: fields.text({ label: 'Institution & Location' }),
      }),
      { label: 'Education', itemLabel: (props) => props.fields.degree.value }
    ),
    awards: fields.array(
      fields.text({ label: 'Award / Certification' }),
      { label: 'Awards & Certifications', itemLabel: (props) => props.value }
    ),
    leadership: fields.array(
      fields.text({ label: 'Leadership / Contribution' }),
      { label: 'Leadership & Contributions', itemLabel: (props) => props.value }
    ),
  },
});
