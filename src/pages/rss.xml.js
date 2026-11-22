import rss from '@astrojs/rss';
import { getPosts, describe, postUrl } from '../lib/posts';
import { SITE } from '../lib/site';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: describe(post),
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>ja</language>',
  });
}
