import { config } from '$lib/config';

export const GET = async () => {
	const data = {
		status: 200,
		success: true,
		message: 'ok',
		version: config.version,
	};
	return new Response(JSON.stringify(data));
};
