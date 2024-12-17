<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Head from '$lib/components/layout/Head.svelte';
	import SearchTags from '$lib/components/SearchTags.svelte';

	let { data } = $props();
	
	const { slugs = [], posts = [], tags = [], title = 'Пивзаводы', subtitle = 'Список белорусских пивзаводов на начало 21-го века', search = true, h2 = false } = data;
	const total: number = posts?.length ?? 0;
	const base: string = slugs?.length > 0 ? slugs[0] : 'breweries';
</script>

<Head title="Пивзаводы" />

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<SearchTags {tags} {base} {search} {total} {title} {subtitle} {h2} />

	<div class="container py-12">
		<div class="-m-4 flex flex-wrap">
			{#if total<1}
				Нет записей
			{:else}
				{#each posts as post}
					<Card card={post} />
				{/each}
			{/if}
		</div>
	</div>
</div>
