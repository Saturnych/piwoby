import type { Content, Contents } from '$lib/types';
import { getContentByTypes } from '$lib/utils';
import { config, navLinks } from '$lib/config';

export const prerender = true;

const trimSlash = (str) => str.replace(/^\/|\/$/g, '');

const sitemap = (pages) => `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
  >
    <url>
      <loc>${config.siteUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${pages.map(page => `
    <url>
      <loc>${config.siteUrl}/${trimSlash(page.slug)}</loc>
      <changefreq>daily</changefreq>
      <priority>${page.priority}</priority>
    </url>
    `).join('')}
  </urlset>`;


export const GET = () => {
	const posts: Record<string, Content> = {};
	const content: Contents = getContentByTypes(['news','posts','zavod','pages']);
	for (const type in content) {
		content[type].forEach((post) => {
			posts[post.slug] = post;
		});
	}
	const keys: string[] = Object.keys(posts);
	console.log('keys:',keys);

	const pages: { priority: number; slug: string; }[] = [];
	for (const link of navLinks) {
		const { slug } = link;
		pages.push({ priority: 0.9, slug });
		const subs: string[] = keys.filter(f=>(f.startsWith(slug) && f!==slug));
		console.log(slug, 'subs:',subs);
		subs.forEach(k=>pages.push({ priority: 0.7, slug: posts[k].slug }));
	}

	const body = sitemap(pages);

	return new Response(body, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=${3600}`,
			'Content-Type': 'application/xml'
		}
	});
};
