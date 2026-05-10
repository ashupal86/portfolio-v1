/**
 * Projects Collection Schema
 * Each project card shown in the "Related Work" section.
 * Cover image → shown in hover reveal + project detail page.
 */
import { fields, collection } from '@keystatic/core';

export const projectsSchema = collection({
  label: '🛠️ Projects',
  slugField: 'title',
  path: 'content/projects/*',
  schema: {
    title: fields.slug({ name: { label: 'Project Title' } }),
    description: fields.text({
      label: 'Short Description',
      multiline: true,
      description: 'One-two sentence summary shown in the project list row.',
    }),

    coverImage: fields.image({
      label: 'Cover Image',
      directory: 'public/images/projects',
      publicPath: '/images/projects',
      description: 'Shown on hover reveal in project list AND on project detail page.',
    }),
    techStack: fields.array(
      fields.text({ label: 'Technology' }),
      {
        label: 'Tech Stack',
        description: 'Listed as category tags below the title.',
        itemLabel: (p) => p.value,
      }
    ),
    githubUrl: fields.url({ label: 'GitHub URL' }),
    liveUrl: fields.url({ label: 'Live Demo URL' }),
    featured: fields.checkbox({
      label: 'Featured on Homepage',
      defaultValue: false,
    }),
    status: fields.select({
      label: 'Status',
      options: [
        { label: 'Completed',   value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Archived',    value: 'archived' },
      ],
      defaultValue: 'completed',
    }),
    order: fields.number({
      label: 'Display Order (lower = first)',
      defaultValue: 99,
    }),
  },
});
