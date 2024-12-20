<script lang="ts">
	import { navLinks } from '$lib/config';
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Post from '$lib/components/Post.svelte';

	let { data } = $props();
	console.log('data:', data);

	const { author, post, root, slug, slugs, tags, posts = [] } = data;

	const path: string = !!slug ? `/${root}/${slug}` : `/${root}`;
	console.log('path:', path);

	const current: { href: string, title: string } = navLinks.find(f=>f.href===`/${root}`);
	console.log('current:', current);
</script>

{#if post?.title}
	<Head title="{post.title} - {current?.title || 'Статьи'}" />
	<Post {current} {post} {author} />
{:else}
	<Head title="{current?.title || 'Статьи'}" />
	<Posts {current} {posts} {tags} />
{/if}
