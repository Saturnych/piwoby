<script lang="ts">
	import { page } from '$app/stores';
	import fuzzySearch from '$lib/utils/search';
	import Author from '$lib/components/Author.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import SearchTags from '$lib/components/SearchTags.svelte';

	export let base = 'posts';
	export let tagsBase = 'tags';
	export let title = '';
	export let subtitle = '';
	export let posts = [];
	export let tags = [];
	export let more = true;
	export let search = true;
	export let h2 = false;
	export let count = 0;

	const total: number = posts?.length ?? 0;
	search = search && total>0;

	if (posts && count>0) posts = posts.slice(0, count);

	$: filter = $page.url?.searchParams.get('query');
	$: currentPosts = filter ? fuzzySearch(posts, filter) : posts;
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<SearchTags {tagsBase} {tags} {base} {search} {total} {title} {subtitle} {h2} />

	<div class="container py-12">
		<div class="-m-4 flex flex-wrap">
		{#if currentPosts?.length>0}
			<ul>
				{#each currentPosts as post}
					<li class="py-12">
						<article>
							<div class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
								<Author author={post.author} postDate={post.date} />
								<div class="space-y-5 xl:col-span-3">
									<div class="space-y-6">
										<div>
											<h2 class="text-2xl font-bold leading-8 tracking-tight">
												<a href={`/${post.type}/${post.slug}`} class="text-gray-900 dark:text-gray-100">
													{post.title}
												</a>
											</h2>
											<div class="flex flex-wrap">
												{#each post.tags as tag}
													<Tag text={tag} />
												{/each}
											</div>
										</div>
										<div class="prose max-w-none text-gray-500 dark:text-gray-400">
											{post.summary}
										</div>
									</div>
									{#if more}
										<div class="text-base font-medium leading-6">
											<a
												href={`/${post.type}/${post.slug}`}
												class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
												aria-label={`Читать "${post.title}"`}
											>
												Далее &rarr;
											</a>
										</div>
									{/if}
								</div>
							</div>
						</article>
					</li>
				{/each}
			</ul>
		{:else}
			Нет записей
		{/if}
		</div>
	</div>
</div>
