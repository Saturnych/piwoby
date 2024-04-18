<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Title from '$lib/components/Title.svelte';
	import Head from '$lib/components/layout/Head.svelte';

	export let data;
	const { breweries = [] } = data;
</script>

<Head title="Пивзаводы" />

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pt-6 pb-8 md:space-y-5">
		<Title title="Пивзаводы" subtitle="Список белорусских пивзаводов на начало 21-го века" />
	</div>
	<div class="container py-12">
		<div class="-m-4 flex flex-wrap">
			{#if breweries.length<1}
				Нет записей
			{:else}
				{#each breweries as brewery}
					<Card card={brewery} />
				{/each}
			{/if}
		</div>
	</div>
</div>
