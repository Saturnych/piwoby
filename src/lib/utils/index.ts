import { error } from '@sveltejs/kit';
import { isAuthor, isPost } from '$lib/types';
import type { Content, Contents } from '$lib/types';
import type { Module } from './$types';

export const parseContent = <T>(paths: Record<string, Module>, type: string = 'news'): T[] => {
	console.log(paths);
	const subs: T[] = []; // Post[]
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '').toLowerCase();
		if (file && slug && (typeof file === 'object') && ('metadata' in file)) {
			const metadata = file.metadata as Omit<T, Path>;
			const post = { ...metadata, slug, path, type } satisfies T;
			!post.draft && subs.push(post);
		}
	}
	return subs.sort((first, second) => (new Date(second.date).getTime() - new Date(first.date).getTime()));
};

export const getContent = (type: string = 'news'): Content[] => {
	const content = {
		authors: import.meta.glob('/content/authors/*.md', { eager: true }),
		breweries: import.meta.glob('/content/breweries/*.md', { eager: true }),
		news: import.meta.glob('/content/news/*.md', { eager: true }),
		pages: import.meta.glob('/content/pages/*.md', { eager: true }),
		posts: import.meta.glob('/content/posts/*.md', { eager: true }),
	} as Record<string, Module>;
	content['zavod'] = content['breweries'];
  return parseContent<Content>(content[type], type);
};

export const getSlugs = (pathname: string = ''): string[] => {
	const slugs: string[] = pathname.split('/').filter(p=>!!p).map(s=>decodeURIComponent(s));
	const slug: string = slugs?.length > 0 ? [].concat(slugs).reverse()[0] : '';
	if (slug.startsWith('manifest')) throw error(404, 'Not found');
	return slugs;
};

export const getEntryBySlug = (slug: string, type: string = 'news') => {
	return [].concat(getContent(type)).find(f=>!!f && f.slug===slug);
};

export const loadContent = (url: URL): Record<string, string | string[] | Content | Content[]> => {
  const slugs = getSlugs(url?.pathname || '');
  const slug = [].concat(slugs).reverse()[0];
  const root = slugs[0];
	const posts: Record<string, Content> = getContent(root);
  const post: Content = slug !== root ? posts.find(p=>p.slug===slug) : null;
  const author: Content = post?.author ? getContent('authors').find(a=>a.id===post.author && isAuthor(a)) : null;
  const tags: string[] = post?.tags ? post.tags : [...new Set(posts.map(m=>m.tags).filter(f=>!!f))];
	return {
    author,
    post,
    posts,
    root,
    slug,
		slugs,
		tags,
	};
};

export const getUrlSegments = (url: URL) => {
	const { href, origin, pathname } = url;
	const segments = {
		href: url?.href || '',
		origin: url?.origin || '',
		pathname: url?.pathname || '',
		search: url?.search || '',
	};
	return segments;
};

// parseQueryString(url, 'query')
export const parseQueryString = (url: URL, getParam?: string): Record<string, string> => {
	const { search } = url;
	const result: Record<string, string> = {};
	const blocks: string[] = !!search
		? search
				.trim()
				.split('?')
				.filter((f) => !!f)
				.join('')
				.split('&')
				.filter((f) => !!f)
		: [];
	if (blocks?.length < 1) return result;
	if (getParam) {
		const found: string = blocks.find((f) => f.startsWith(getParam));
		if (!!found) result[getParam] = found.split('=').reverse()[0];
	} else {
		blocks.forEach((b) => {
			const params: string[] = b.split('=');
			const param: string = params?.length > 0 ? params[0] : null;
			if (!!param && params?.length > 1) result[param] = params[1];
		});
	}
	return result;
};

export const getQsParam = (url: URL, getParam: string = 'query') => {
	console.warn('url:', url);
	const parsed: Record<string, string> = parseQueryString(url, getParam);
	console.warn('parsed:', parsed);
	return parsed ? parsed[getParam] : '';
};


/*
const mapTags = (entries: object[]) => {
	return entries
		.filter(p=>!!p)
		.flatMap(({ tags }) => tags)
		.map((tag) => ({ text: tag, slug: slug(tag) }))
		.reduce((arr, tag) => {
			const index = arr.findIndex((t) => t.slug === tag.slug);
			if (index > -1) arr[index].count++;
			else arr.push({ text: tag.text, slug: tag.slug, count: 1 });
			return arr;
		}, [])
		.sort((a, b) => (b.text < a.text ? 1 : -1));
};

export const getTagsBySlug = (entrySlug: string) => mapTags([getEntryBySlug(entrySlug)]);

export const getTags = (entryType?: string) => {
	const entries = entryType ? getEntriesByType(entryType) : getEntries();
	return mapTags(entries);
};

*/
