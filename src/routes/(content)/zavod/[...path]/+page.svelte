<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Brewery from '$lib/components/Brewery.svelte';

	export let data;
	const { brewery } = data;
	console.log(brewery);
</script>

<Head title="{brewery?.title}" />

<Brewery {brewery} />
