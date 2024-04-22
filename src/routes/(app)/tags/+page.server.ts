import { error } from '@sveltejs/kit';
import { getTags, getSlugs } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const parent = await event.parent();
  const slugs = getSlugs(parent.pathname);
	const tags = getTags();
	return {
		slugs,
		tags,
	};
};
