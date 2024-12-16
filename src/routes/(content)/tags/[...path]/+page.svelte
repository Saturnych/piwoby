<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';

	export let data;
	const { title = 'Теги', posts = [], tags = [], slug = '' } = data;
</script>

<Head title="{title}" />

<Posts title="Записи по тегу '{slug.split('-').join(' ')}'" search={false} {posts} {tags} />
