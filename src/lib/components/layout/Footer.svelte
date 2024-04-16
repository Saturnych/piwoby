<script>
	import { config } from '$lib/config';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import Newsletter from '$lib/components/Newsletter.svelte';

	let year = new Date().getFullYear();
</script>

<footer>
	<div class="mt-16 flex flex-col items-center border-t pt-6 gap-2">
		<div class="mb-3 flex space-x-2">
			{#if config.email}<SocialIcon icon="mail" url={`mailto:${config.email}`} />{/if}
			{#if config.github}<SocialIcon icon="github" url={config.github} />{/if}
			{#if config.facebook}<SocialIcon icon="facebook" url={config.facebook} />{/if}
			{#if config.youtube}<SocialIcon icon="youtube" url={config.youtube} />{/if}
			{#if config.linkedin}<SocialIcon icon="linkedin" url={config.linkedin} />{/if}
			{#if config.twitter}<SocialIcon icon="twitter" url={config.twitter} />{/if}
		</div>
		{#if config.newsletter.provider}
			<Newsletter />
		{/if}
		<div class="mb-4 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
			<a href="{config.siteUrl}">{config.title}</a> &nbsp; • &nbsp; © {year}
			<a href="{`mailto:${config.email}`}">{config.author}</a> &nbsp; • &nbsp; <a href="{config.siteUrl}rss.xml">RSS Feed</a>
		</div>
	</div>
</footer>
