<script lang="ts">
	import { navLinks } from '$lib/config';
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import Post from '$lib/components/Post.svelte';

	export let data;
	const { author, posts, post, slugs, slug, tags } = data;

	const base = slugs?.length > 0 ? slugs[0] : 'blog';
	const current: { href: string, title: string } = navLinks.filter(n=>n.href===`/${base}`)[0]
</script>

{#if post?.title}
	<Head title="{post.title} - {current?.title || 'Статьи'}" />
	<Post title="{current?.title || 'Статьи'}" {base} {post} {author} />
{:else}
	<Head title="{current?.title || 'Статьи'}" />
	<Posts title="{current?.title || 'Статьи'}" {base} {posts} {tags} />
{/if}
