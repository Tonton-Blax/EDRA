<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'
	import Transition from '../components/Transition.svelte';
	export let segment;
</script>

<Nav {segment} />
<body>
<div class="container">
	<Transition refresh={segment}>
	<div class="columns is-gapless is-multiline">
			<slot />
	</div>
	</Transition>
</div>


<Footer {segment} />
</body>


<style>
	.container {
		background:white;
	}

	:global(main) {
		padding-top:32px;
	}


</style>