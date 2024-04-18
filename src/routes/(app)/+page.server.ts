import { error } from '@sveltejs/kit';
import { getEntries } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const posts = getEntries('news');
	return {
		posts
	};
};
