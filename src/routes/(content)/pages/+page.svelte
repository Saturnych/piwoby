<script lang="ts">
	import { page } from '$app/stores';
	import { navLinks } from '$lib/config';
	import { getUrlSegments } from '$lib/utils';
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';

	let { data } = $props();
	console.log(data);
	const { posts, slugs, tags } = data;

	const { url }: { url: URL } = $page;
	const { pathname }: { pathname: string } = getUrlSegments(url);
	console.log('pathname:', pathname);

	const root: string = pathname.split('/').filter(f=>!!f)[0];
	const base: string = slugs?.length > 0 ? slugs[0] : 'blog';
	console.log('root:', root, 'base:', base);

	const current: { href: string, title: string } = navLinks.filter(f=>f.href===`/${root}/${base}`)[0];
	console.log('current:', current);
</script>

<Head title="{current?.title || 'Записи'}" />
<Posts title="{current?.title || 'Записи'}" {root} {posts} {tags} />
