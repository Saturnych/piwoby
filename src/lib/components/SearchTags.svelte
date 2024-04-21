<script lang="ts">
	import { page } from '$app/stores';
	import Tag from '$lib/components/Tag.svelte';
	import Title from '$lib/components/Title.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';

	export let base = 'posts';
	export let tagsBase = 'tags';
	export let title = '';
	export let subtitle = '';
	export let tags = [];
	export let search = true;
	export let h2 = false;
	export let total = 0;

	search = search && total>0;
</script>

	<div class="space-y-2 pt-6 pb-8 md:space-y-5">
		<div class="grid lg:grid-cols-2 gap-4">
			<div>
				<Title {title} {subtitle} {h2} />
			</div>

			<div class="pl-4" class:border-l-2={search}>
				{#if search}
					<SearchBox {base} />
				{/if}

				{#if tags.length}
					<div class="flex flex-wrap">
						{#each tags as tag}
							<div class="mr-5">
								<Tag text={tag.text} size="text-xs" />
								<a
									href={`/${tagsBase}/${tag.slug}`}
									class="-ml-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300"
								>
									{` (${tag.count})`}
								</a>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>	
