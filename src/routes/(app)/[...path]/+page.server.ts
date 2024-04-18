import { getAuthorBy, getEntryBySlug, getEntries, getTags } from '$lib/utils/entries';
import type { Event } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: Event): Promise<Record<string, any>> => {
	const parent = await event.parent();
  console.log('path parent:', parent);
  const slugs = parent.pathname.split('/').filter(p=>!!p);
  console.log('path slugs:', slugs);
	const tags = getTags();
	const posts = getEntries(slugs[0]);
	let post: object, author: object, slug: string;
	if (slugs?.length>1) {
		post = getEntryBySlug(slugs[1], slugs[0]);
		if (post?.author) author = getAuthorBy(post.author, 'id');
		if (post?.author && !author) author = getAuthorBy(post.author, 'name');
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
