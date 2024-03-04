import { error } from '@sveltejs/kit';
import { slug } from 'github-slugger';
import { getEntries, getTags } from '$lib/utils/entries';

function slugsArray(tags) {
	return tags?.map((t) => slug(t)) || [];
}

export const prerender = false;

export const ssr = false;

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	/*
	return [
		{ slug: 'hello-world' },
		{ slug: 'another-blog-post' }
	];
	*/
	return getTags();
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	if (!params?.path) {
		throw error(404, 'No post found');
	}
	const { path } = params;

	const posts = getEntries('posts');
	const filteredPosts = posts.filter((p) => slugsArray(p.tags).includes(path));

	if (!filteredPosts) {
		throw error(404, 'No post found');
	}

	return {
		// eslint-disable-next-line no-unused-vars
		tag: tag,
		posts: filteredPosts
	};
}
