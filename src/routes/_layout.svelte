<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'
	import Transition from '../components/Transition.svelte';
	export let segment;

</script>

<Nav {segment} />

<Transition refresh={segment}>
	<slot/>
</Transition>

<Footer {segment} />



<style lang="scss" global>
	@import '../styles/global.scss';

	main {
		padding-top:32px;
	}
</style>