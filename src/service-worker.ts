import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute, precache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { build, files, prerendered, version } from '$service-worker';
import { name, description, repository } from '../package.json';
import * as static_public from '$env/static/public';

declare let self: ServiceWorkerGlobalScope;

const STATIC_ENV = Object.assign({}, static_public);
const DEV_LOGS = String(STATIC_ENV['PUBLIC_DEV_LOGS']) === 'true';
const SW_VERSION = `${name}-${version}`;

if (DEV_LOGS) console.log('STATIC_ENV:', STATIC_ENV, 'SW_VERSION:', SW_VERSION);

self.__WB_DISABLE_DEV_LOGS = !DEV_LOGS;

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
