import { getAuthorBy, getEntryBySlug, getEntriesByType, getTags, getSlugs } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const parent = await event.parent();
  console.log('path parent:', parent);
  const slugs = getSlugs(parent.pathname);
  console.log('path slugs:', slugs);
	const tags = getTags();
	console.log('path tags:', tags);
	let posts: object[], post: object, author: object, slug: string;
	if (slugs?.length>1) {
		post = getEntryBySlug(slugs[1], slugs[0]);
		if (post?.author) author = getAuthorBy(post.author);
	} else {
		posts = getEntriesByType(slugs[0]);
	}
	console.log('path post:', post);
	console.log('path author:', author);
	return {
		author,
		post,
		posts,
		slug,
		slugs,
		tags,
	};
};
