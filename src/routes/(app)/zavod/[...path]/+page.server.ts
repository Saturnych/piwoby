import { error } from '@sveltejs/kit';
import { getEntryBySlug, getSlugs } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
  const parent = await event.parent();
  const slugs = getSlugs(parent.pathname);
  console.log('zavod slugs:', slugs);
  const slug = slugs[1];
  const brewery = getEntryBySlug(slug, 'breweries');
	if (!brewery) throw error(404, 'No brewery found');
	return {
		...parent,
    slug,
    brewery,
	};
};
