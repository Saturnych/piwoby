import { error } from '@sveltejs/kit';
import { isAuthor, isPost } from '$lib/types';
import type { Content, Contents } from '$lib/types';
import type { Module } from './$types';

export const parseContent = <T>(files: Record<string, Module>, type: string = 'news'): T[] => {
	const subs: T[] = []; // Post[]
	for (const path in files) {
		const file: Module = files[path];
		if (file && (typeof file === 'object') && ('metadata' in file)) {
			const slug = path.toLowerCase().replace('.md', '/').split('/').filter(f=>!!f).slice(1).join('/');
			const metadata = file.metadata as Omit<T, Path>;
			const post = { ...metadata, slug, path, type } satisfies T;
			!post.draft && subs.push(post);
		}
	}
	return subs.sort((first, second) => (new Date(second.date).getTime() - new Date(first.date).getTime()));
};

export const getModules = (): Record<string, Module> => {
	return {
		authors: import.meta.glob('/content/authors/*.md', { eager: true }),
		zavod: import.meta.glob('/content/zavod/*.md', { eager: true }),
		news: import.meta.glob('/content/news/*.md', { eager: true }),
		pages: import.meta.glob('/content/pages/*.md', { eager: true }),
		posts: import.meta.glob('/content/posts/*.md', { eager: true }),
	} as Record<string, Module>;
};

export const getContentByTypes = (types?: string[]): Contents => {
	const content: Record<Contents> = {};
	const modules: Record<string, Module> = getModules();
	if (!types || types?.length<1) types = Object.keys(modules);
	for (const type of types) {
		content[type] = parseContent<Content>(modules[type], type);
	}
	return content;
};

export const getSlugs = (pathname: string = ''): string[] => {
	return pathname.split('/').filter(p=>!!p).map(s=>decodeURIComponent(s));
};

export const getEntryBySlug = (slug: string, type: string = 'news') => {
	return [].concat(getContentByTypes([type])[type]).find(f=>f.slug===slug);
};

export const loadContent = (url: URL): Record<string, string | string[] | Content | Content[]> => {
  const slugs = getSlugs(url?.pathname || '');
  const slug = [].concat(slugs).join('/');
  const root = slugs[0];
	const contents: Contents = getContentByTypes([root, 'authors']);
	const posts: Content[] = contents[root];
  const post: Content = slug !== root ? posts.find(p=>p.slug===slug) : null;
  const author: Content = post?.author ? contents['authors'].find(a=>a.id===post.author && isAuthor(a)) : null;
  const tags: string[] = post?.tags ? post.tags : [...new Set(posts.map(m=>m.tags).flat().filter(f=>!!f))];
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
