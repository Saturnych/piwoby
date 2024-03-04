import { error } from '@sveltejs/kit';
import { getEntries } from '$lib/utils/entries';

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
	return getEntries('posts');
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	if (!params?.path) {
		throw error(404, 'No post found');
	}
	const { path } = params;
	const posts = getEntries('posts');
	const authors = getEntries('authors');
	const post = posts.find((p) => p.slug === path);
	const author = authors.find((a) => a.name === post.author);

	if (!post) {
		throw error(404, 'No post found');
	}

	return {
		// eslint-disable-next-line no-unused-vars
		post: post,
		author: author
	};
}
