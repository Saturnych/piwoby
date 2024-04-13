import { error } from '@sveltejs/kit';
import { getEntries } from '$lib/utils/entries';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { pathname } }): Promise<Record<string, any>> => {
	const authors = getEntries('authors');
	if (!authors) throw error(404, 'No post found');
	return { authors };
};
