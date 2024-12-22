import { error, json } from '@sveltejs/kit';
import { getContentByTypes } from '$lib/utils';
import type { Event, PageServerLoad } from './$types';
import type { Contents } from '$lib/types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, Content>> => {
	const posts: Content[] = getContentByTypes(['news'])?.news;
	return {
		posts
	};
};

/*
export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
*/
