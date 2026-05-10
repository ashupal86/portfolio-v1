import { reader } from './src/lib/keystatic';

async function main() {
  const posts = await reader.collections.posts.all();
  console.log(posts.map(p => p.slug));
}

main();
