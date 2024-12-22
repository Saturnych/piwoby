<script lang="ts">
	import '../app.css';
	import type { PageData } from './$types';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import Metrika from '$lib/components/Metrika.svelte';
	import Transition from '$lib/components/layout/Transition.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Analytics from '$lib/components/analytics/index.svelte';

	let { children, data } = $props();

	const SW_ENABLED = false; //dev;
</script>

<div class="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
	<div class="flex h-screen flex-col justify-between">
		<Header />
		<main class="mb-auto">
			<Transition pathname={$page.url?.pathname || '/'}>
				{@render children()}
			</Transition>
		</main>
		<Footer />
	</div>
</div>

{#if !dev}
	<Metrika />
	<Analytics />
{/if}

{#if SW_ENABLED}
	{#await import('$lib/components/ReloadPrompt.svelte') then { default: ReloadPrompt }}
		<ReloadPrompt />
	{/await}
{/if}
