import adapter from '@sveltejs/adapter-auto';
//import { vitePreprocess } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
					return;
				}
				// otherwise fail the build
				//throw new Error(message);
				//return;
			}
		},
		// remove this if you're not using comment system
		csp: { mode: 'auto' }
	},
	preprocess: [mdsvex(mdsvexConfig), vitePreprocess()]
};

export default config;
