<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'
	import Transition from '../components/Transition.svelte';
	export let segment;
</script>

<Nav {segment} />

<div class="container">
	<Transition refresh={segment}>
	<div class="columns is-gapless is-multiline">
			<slot />
	</div>
	</Transition>
</div>


<Footer {segment} />

<style lang="scss" global>
	@import '../styles/global.scss';

	.container {
		background:white;
	}

	main {
		padding-top:32px;
	}
</style>