import { reader } from './src/lib/keystatic';
async function test() {
  const posts = await reader.collections.posts.all();
  console.log(posts[0]?.slug, await posts[0]?.entry.body());
}
test();
