import { reader } from './src/lib/keystatic';
async function test() {
  const projects = await reader.collections.projects.all();
  console.log(JSON.stringify(projects.map(p => ({ slug: p.slug, coverImage: p.entry.coverImage })), null, 2));
}
test();
