<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';

	export let data;
	const posts = data.posts;
	const tags = data.tags;
</script>

<Head title="Статьи" />

<Blogs title="Статьи" {posts} {tags} />
