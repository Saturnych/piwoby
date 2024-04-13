import { getEntries, getTags } from '$lib/utils/entries';
// import { tags } from '$lib/data/tags';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ url: { pathname } }): Promise<Record<string, any>> => {
	const posts = getEntries('posts');
	if (!posts) throw error(404, 'No post found');
	const tags = getTags();
	return {
		posts,
		tags,
	};
};
