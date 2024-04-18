import { getEntries } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const breweries = getEntries('breweries');
	return {
		breweries
	};
};
