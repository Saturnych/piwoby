import { slug } from 'github-slugger';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { config, user } from '$lib/config';

// we require some server-side APIs to parse all metadata
if (browser) {
	throw new Error(`projects can only be imported server-side`);
}

const getMetadata = (filepath, entry) => {
	const { metadata = {} } = entry;
	const slugs = filepath
		.replace(/(\/index)?\.md/, '')
		.split('/')
		.filter(s=>s.length>0);
	return {
		...metadata,
		author: !config.multiuser ? user.name : metadata?.author,
		content: entry.default.render().html,
		// generate the slug from the file path
		type: slugs[1],
		slug: slugs[2],
		// twitter: metadata?.twitter
		// 	? metadata.twitter.replace(/(http(s)?:\/\/)?((w){3}.)?twitter\.com\/?/, '')
		// 	: null,
		youtube: metadata?.video
			? metadata.video.replace(
					/(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)(\.com)?\/(watch\?v=)?/,
					''
				)
			: null,
		tag: metadata?.type?.split(' ').shift().toLowerCase() || null,
		tags: metadata?.tags || [],
		labels: metadata?.labels || [],
		// whether or not this file is `my-post.md` or `my-post/index.md`
		// (needed to do correct dynamic import in posts/[slug].svelte)
		// isIndexFile: filepath.endsWith('/index.md')
	};
};

export const mapEntries = (entries) => {
	return (
		entries
			// format metadata and content
			.map(([filepath, entry]) => getMetadata(filepath, entry))
			// remove drafts
			.filter((entry) => !entry.draft)
			// sort by date
			.sort((a, b) => (a.date < b.date ? 1 : -1))
			// add references to the next/previous entry
			.map((entry, index, allEntries) => ({
				...entry,
				next: allEntries[index - 1],
				prev: allEntries[index + 1]
			}))
	);
};


// we have to have separate actions for this because Vite only accepts literal strings for import.meta.glob
const getContent = (entryTypes: string[]): Record<string,object[]> => {
	const content: Record<string,object[]> = {};
	for (let i=0;i<entryTypes.length;i++) {
		const entryType: string = entryTypes[i];
		switch (entryType) {
			case 'news':
				content[entryType] = mapEntries(Object.entries(import.meta.glob('/content/news/**/*.md', { eager: true })));
				break;
			case 'projects':
				content[entryType] = mapEntries(Object.entries(import.meta.glob('/content/projects/**/*.md', { eager: true })));
				break;
			case 'authors':
				content[entryType] = mapEntries(Object.entries(import.meta.glob('/content/authors/**/*.md', { eager: true })));
				break;
			case 'pages':
				content[entryType] = mapEntries(Object.entries(import.meta.glob('/content/pages/**/*.md', { eager: true })));
				break;
			case 'breweries':
				content[entryType] = mapEntries(Object.entries(import.meta.glob('/content/breweries/**/*.md', { eager: true })));
				break;
			case 'posts':
				content[entryType] = mapEntries(Object.entries(import.meta.glob('/content/posts/**/*.md', { eager: true })));
				break;
		}
	}
	return content;
};

// Get all entries and add metadata
export const getEntries = (): object[] => {
	const { news = [], posts = [], breweries = [], pages = [] } = getContent(['news','posts','breweries','pages']);
	return [].concat(news, posts, breweries, pages);
};

export const getEntriesByType = (entryType?: string) => {
	if (!config.multiuser && entryType === 'authors') return [user];
	return getContent([entryType])[entryType];
};

export const getEntriesByTag = (tagSlug: string, entryType?: string) => {
	const entries = entryType ? getEntriesByType(entryType) : getEntries();
	return entries?.length > 0 ? entries.filter(e => (e.tags ? e.tags.map(t=>t.toLowerCase()).includes(tagSlug.toLowerCase()) : false)) : [];
};

export const getEntryBySlug = (entrySlug: string, entryType?: string) => {
	const entries = [].concat(entryType ? getEntriesByType(entryType) : getEntries()).filter(e => (e?.slug ? e.slug.toLowerCase()===entrySlug.toLowerCase() : false));
	return entries?.length > 0 ? entries[0] : null;
};

export const getAuthorBy = (authorName: string, by?: string) => {
	const { authors } = getContent(['authors']);
	const entries = !by ? authors.filter(e => (e['id'].toLowerCase()===authorName.toLowerCase() || e['name'].toLowerCase()===authorName.toLowerCase())) : authors.filter(e => e[by].toLowerCase()===authorName.toLowerCase());
	return entries?.length > 0 ? entries[0] : null
};

export const getTags = (entrySlug?: string) => {
	const entries = entrySlug ? [getEntryBySlug(entrySlug)] : getEntries();
	const tags = entries
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
	return tags;
};

export const getSlugs = (pathname: string): string[] => {
	const slugs: string[] = pathname.split('/').filter(p=>p.length>0).map(s=>decodeURIComponent(s));
	const slug: string = [].concat(slugs).reverse()[0];
	if (slug.startsWith('manifest')) throw error(404, 'Not found');
	return slugs;
};
