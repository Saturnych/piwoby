<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Brewery from '$lib/components/Brewery.svelte';

	let { data } = $props();
	
	const { post } = data;
	console.log(post);
</script>

<Head title="{post?.title}" />

<Brewery {post} />
