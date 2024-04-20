import { error } from '@sveltejs/kit';
import { getEntriesByTag, getTags } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
  const parent = await event.parent();
  const slug = decodeURIComponent(parent.pathname.split('/').filter(p=>!!p).reverse()[0])
  const posts = getEntriesByTag(slug);
	const tags = getTags();
	return {
		...parent,
    slug,
    posts,
		tags,
	};
};
