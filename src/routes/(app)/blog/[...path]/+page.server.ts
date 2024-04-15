import { error } from '@sveltejs/kit';
import { getEntries, getTags, getEntryBySlug, getAuthorByName } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
  const parent = await event.parent();
  const slug = parent.pathname.split('/').filter(p=>!!p).reverse()[0];
  const post = getEntryBySlug(slug);
	if (!post) throw error(404, 'No post found');
  const author = getAuthorByName(post.author);
	const tags = getTags(slug);
	return {
		...parent,
    slug,
    post,
    author,
		tags,
	};
};
