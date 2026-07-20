import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { withBase } from '../utils/links';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'Sijo Thomas — Blog',
    description:
      'Notes on building production ML systems — RAG on AWS, time series forecasting, and engineering practice.',
    site: new URL(withBase('/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: withBase(`/blog/${post.id}/`),
      categories: post.data.tags,
    })),
  });
}
