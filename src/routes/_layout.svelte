<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'

	export let segment;
</script>

<Nav {segment} />

<main>
	<slot />
</main>

<Footer {segment} />

<style lang="scss" global>
	@import '../styles/global.scss';

	main {
		padding-top:32px;
	}
</style>