import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute, precache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { build, files, prerendered, version } from '$service-worker';
import { config } from '$lib/config';
import * as env from '$env/static/public';

const { name, description, repository } = config;
const SW_VERSION: string = `${name}-${version}`;
const DEV: boolean = String(env.PUBLIC_ENV).toLowerCase().startsWith('dev');
if (DEV) console.log('env.PUBLIC_ENV:', env.PUBLIC_ENV, 'SW_VERSION:', SW_VERSION);

declare let self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = !DEV;

self.addEventListener('message', (event) => {
	if (event.data?.type === 'SKIP_WAITING') {
		self.skipWaiting();
	} else if (event.data?.type === 'GET_VERSION') {
		event.ports[0].postMessage(SW_VERSION);
	}
});

precacheAndRoute([
	...build.map((f) => {
		return {
			url: f,
			revision: null
		};
	}),
	...files.map((f) => {
		return {
			url: f,
			revision: SW_VERSION
		};
	}),
	...prerendered.map((f) => {
		return {
			url: f,
			revision: SW_VERSION
		};
	})
]);

// Edit the list of routes so they get cached and routed correctly, allowing
// cold start or hot reload to work offline.
const skRoutes = ['/offline'];

precache(
	skRoutes.map((f) => {
		return {
			url: f,
			revision: SW_VERSION
		};
	})
);

const matchCb = ({ url, request, event }) => {
	return skRoutes.some((path) => url.pathname === path);
};
registerRoute(matchCb, new StaleWhileRevalidate({}));
