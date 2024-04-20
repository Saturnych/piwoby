import { getEntriesByType, getSlugs, getTags } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const parent = await event.parent();
  const slugs = getSlugs(parent.pathname);
	const posts = getEntriesByType(slugs[0]);
	const tags = getTags();
	return {
		posts,
		slugs,
		tags,
	};
};
