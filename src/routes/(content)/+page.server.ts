import { error, json } from '@sveltejs/kit';
import { getContent } from '$lib/utils';
import type { Event, PageServerLoad } from './$types';
import type { Content } from '$lib/types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, Content>> => {
	const posts: Record<string, Content> = getContent();
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
