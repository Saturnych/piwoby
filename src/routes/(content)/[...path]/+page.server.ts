import { getAuthorBy, getEntryBySlug, getEntriesByType, getTags, getSlugs } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const parent = await event.parent();
  const slugs = getSlugs(parent.pathname);
	const slug = [].concat(slugs).reverse()[0];
	const tags = getTags(slugs[0]);
	let posts: object[] = [], post: object, author: object;
	if (slugs?.length>1) {
		post = getEntryBySlug(slugs[1], slugs[0]);
		if (post?.author) author = getAuthorBy(post.author);
	} else {
		posts = getEntriesByType(slugs[0]);
	}
	return {
		author,
		post,
		posts,
		slug,
		slugs,
		tags,
	};
};
