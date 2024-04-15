<script lang="ts">
	import { page } from '$app/stores';
	import Error from '$lib/components/Error.svelte';

	$: status = String($page.status);
</script>

<Error {status} />
