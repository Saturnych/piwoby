import { slug } from 'github-slugger';
import { browser } from '$app/environment';
import { config, user } from '$lib/config';

// we require some server-side APIs to parse all metadata
if (browser) {
	throw new Error(`projects can only be imported server-side`);
}

// we have to have separate functions for this because Vite only accepts literal strings for import.meta.glob
const getPosts = () => {
	return Object.entries(import.meta.glob('/content/posts/**/*.md', { eager: true }));
};

const getNews = () => {
	return Object.entries(import.meta.glob('/content/news/**/*.md', { eager: true }));
};

const getProjects = () => {
	return Object.entries(import.meta.glob('/content/projects/**/*.md', { eager: true }));
};

const getAuthors = () => {
	return Object.entries(import.meta.glob('/content/authors/**/*.md', { eager: true }));
};

const getPages = () => {
	return Object.entries(import.meta.glob('/content/pages/**/*.md', { eager: true }));
};

const getBreweries = () => {
	return Object.entries(import.meta.glob('/content/breweries/**/*.md', { eager: true }));
};

const getEntriesByType = (entryType: string) => {
	switch (entryType) {
		case 'posts':
			return getPosts();
		case 'news':
			return getNews();
		case 'projects':
			return getProjects();
		case 'authors':
			return getAuthors();
		case 'pages':
			return getPages();
		case 'breweries':
			return getBreweries();
		default:
			throw new Error(`unknown entry type ${entryType}`);
	}
};

const getMetadata = (entryType, filepath, entry) => {
	return {
		...entry.metadata,

		author: entryType === 'posts' && !config.multiuser ? user.name : entry.metadata.author,

		content: entry.default.render().html,

		// generate the slug from the file path
		slug: filepath
			.replace(/(\/index)?\.md/, '')
			.split('/')
			.pop(),

		// twitter: entry.metadata.twitter
		// 	? entry.metadata.twitter.replace(/(http(s)?:\/\/)?((w){3}.)?twitter\.com\/?/, '')
		// 	: null,
		youtube: entry.metadata.video
			? entry.metadata.video.replace(
					/(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)(\.com)?\/(watch\?v=)?/,
					''
				)
			: null,

		tag: entry.metadata.type?.split(' ').shift().toLowerCase() || null,
		tags: entry.metadata.tags || [],
		labels: entry.metadata.labels || [],

		// whether or not this file is `my-post.md` or `my-post/index.md`
		// (needed to do correct dynamic import in posts/[slug].svelte)
		// isIndexFile: filepath.endsWith('/index.md')
	};
};

// Get all entries and add metadata
export const getEntries = (entryType: string) => {
	if (!config.multiuser && entryType === 'authors') return [user];
	const entries = getEntriesByType(entryType);
	return (
		entries
			// format metadata and content
			.map(([filepath, entry]) => getMetadata(entryType, filepath, entry))
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

export const getEntriesByTag = (tagSlug: string, entryType?: string) => {
	const entries = entryType ? getEntries(entryType) : getEntries('news').concat(getEntries('posts'));
	return entries.filter(e => e.tags.map(t=>t.toLowerCase()).includes(tagSlug.toLowerCase()));
};

export const getEntryBySlug = (entrySlug: string, entryType: string = 'posts') => {
	const entries = getEntries(entryType).filter(e => e.slug===entrySlug);
	return entries?.length > 0 ? entries[0] : null;
};

export const getAuthorBy = (authorName: string, by: string = 'name') => {
	const entries = getEntries('authors').filter(e => e[by].toLowerCase()===authorName.toLowerCase());
	return entries?.length > 0 ? entries[0] : null
};

export const getTags = (entrySlug?: string) => {
	const posts = entrySlug ? [getEntryBySlug(entrySlug)] : getEntries('posts');
	const tags = posts
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
