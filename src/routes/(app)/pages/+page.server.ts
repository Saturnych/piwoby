import { getEntriesByType, getTags } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const parent = await event.parent();
  const slugs = parent.pathname.split('/').filter(p=>!!p).map(s=>decodeURIComponent(s));
	const posts = getEntriesByType(slugs[0]);
	const tags = getTags();
	return {
		posts,
		slugs,
		tags,
	};
};
