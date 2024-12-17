<script lang="ts">
	import { navLinks } from '$lib/config';
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Post from '$lib/components/Post.svelte';

	let { data } = $props();
	console.log(data);

	const { author, post, posts, root, slug, slugs, tags } = data;

	const path: string = !!slug ? `/${root}/${slug}` : `/${root}`;

	console.log('navLinks:', navLinks);
	const current: { href: string, title: string } = navLinks.find(f=>f.href===`/${path}`);
	console.log('current:', current);
</script>

{#if post?.title}
	<Head title="{post.title} - {current?.title || 'Статьи'}" />
	<Post title="{current?.title || 'Статьи'}" {post} {author} {tags} {root} />
{:else}
	<Head title="{current?.title || 'Статьи'}" />
	<Posts title="{current?.title || 'Статьи'}" {posts} {tags} {root} />
{/if}
