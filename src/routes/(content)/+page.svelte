<script lang="ts">
	import Head from '$lib/components/layout/Head.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import { config } from '$lib/config';

	export let data;
	const { posts = [] } = data;
</script>

<Head />

<div class="pt-12">
	<h1 class="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">Первый белорусский портал про пиво</h1>
	<p class="text-xl prose-xl text-gray-800 dark:text-gray-400">
		На сайте размещён архив первого белорусского пивного портала "Пиво Беларуси" за 2000-2003 гг.
	</p>
</div>

<Posts {posts} search={false} count={3} h2 title="Последние новости" />
