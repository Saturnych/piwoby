<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Blog from '$lib/components/Blog.svelte';

	export let data;
	const { post, author } = data;
</script>

<Head title="{post?.title}" />

<Blog {post} {author} />
