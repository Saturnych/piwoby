import { loadContent } from '$lib/utils';
import type { Event, PageServerLoad } from './$types';

export const load = (event: Event): Record<string, string | string[] | Content | Content[]> =>
  loadContent(event.url) satisfies PageServerLoad;
