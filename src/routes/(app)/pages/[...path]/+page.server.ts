import { error } from '@sveltejs/kit';
import { getEntryBySlug } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
  const parent = await event.parent();
  const slugs = parent.pathname.split('/').filter(p=>!!p).map(s=>decodeURIComponent(s));
  console.log('pages/path slugs:', slugs);
  const post = getEntryBySlug(slugs[1], slugs[0]);
	return {
		...parent,
    post,
	};
};
