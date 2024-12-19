<script lang="ts">
	import { navLinks } from '$lib/config';
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Post from '$lib/components/Post.svelte';

	let { data } = $props();
	const { author, post, posts, root, slug, slugs, tags } = data;

	const path: string = !!slug ? `/${root}/${slug}` : `/${root}`;

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
