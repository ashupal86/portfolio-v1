/**
 * Blog / Journal Posts Collection Schema
 */
import { fields, collection } from '@keystatic/core';

export const postsSchema = collection({
  label: '✍️ Blog Posts',
  slugField: 'title',
  path: 'content/posts/*',
  entryLayout: 'content',
  format: { contentField: 'body' },
  schema: {
    title: fields.slug({ name: { label: 'Post Title' } }),
    excerpt: fields.text({
      label: 'Excerpt / Summary',
      multiline: true,
      description: 'Short preview shown in the Journal section list.',
    }),
    publishedDate: fields.date({ label: 'Published Date' }),
    coverImage: fields.image({
      label: 'Cover Image',
      directory: 'public/images/blog',
      publicPath: '/images/blog',
    }),
    tags: fields.array(
      fields.text({ label: 'Tag' }),
      { label: 'Tags', itemLabel: (p) => p.value }
    ),
    readTimeMinutes: fields.number({
      label: 'Read Time (minutes)',
      defaultValue: 5,
    }),
    featured: fields.checkbox({ label: 'Featured Post', defaultValue: false }),
    body: fields.mdx({ label: 'Post Body (MDX)' }),
  },
});
