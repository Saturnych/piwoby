<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Blogs from '$lib/components/Blogs.svelte';

	export let data;
	const { posts = [], tags = [], slug = '' } = data;
</script>

<Head title="Blog" />

<Blogs title="Posts by tag '{slug}'" search={false} {posts} {tags} />
