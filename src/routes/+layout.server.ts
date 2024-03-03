import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ url: { pathname } }): Promise<Record<string, any>> => {
	return { pathname };
};
