<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';

	export let data;
	const { posts = [], tags = [], slug = '' } = data;
</script>

<Head title="Blog" />

<Posts title="Posts by tag '{slug}'" search={false} {posts} {tags} />
