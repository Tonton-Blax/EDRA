<script context="module">
	export const prerender = true;
</script>

<script>
	import Nav from '$lib/components/Nav.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Transition from '$lib/components/Transition.svelte';
	import { page } from '$app/stores';
	export let segment;
</script>

<Nav {segment} />

<Transition refresh={$page.path} >
	<slot />
</Transition>

<Footer {segment} />

<style lang="scss" global >

	@import '../app.scss';

	main {
		padding-top:32px;
	}

</style>