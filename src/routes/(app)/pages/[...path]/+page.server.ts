import { error } from '@sveltejs/kit';
import { getEntryBySlug, getSlugs } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
  const parent = await event.parent();
  const slugs = getSlugs(parent.pathname);
  const slug = [].concat(slugs).reverse()[0];
  const post = getEntryBySlug(slugs[1], slugs[0]);
	return {
    post,
    slugs,
    slug,
	};
};
