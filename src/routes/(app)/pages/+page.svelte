<script lang="ts">
	import { navLinks } from '$lib/config';
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';

	export let data;
	const { posts, slugs, tags } = data;
	const base = slugs?.length > 0 ? slugs[0] : 'blog';
	const current: { href: string, title: string } = navLinks.filter(n=>n.href===`/${base}`)[0]
</script>

<Head title="{current?.title || 'Записи'}" />
<Posts title="{current?.title || 'Записи'}" {posts} {tags} />
