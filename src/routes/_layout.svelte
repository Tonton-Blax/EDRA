<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'
	import Transition from '../components/Transition.svelte';
	import Header from '../components/Header.svelte';
	import {observing} from '../utils/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { stores } from '@sapper/app';
	const { page } = stores();

	const optionsSlug = {
		siglePointilles : true,
		bgColor: "#D9E7EC",
		linesColor : "#005476",
		title :	{
			title : "Fiches Techniques", 
			subTitle : "Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus."
		}
	};

	const optionsNormal = {
		siglePointilles : false,
		bgColor: "#005476",
		linesColor: "white",
		title:undefined
	}
	
	export let segment;
	let headerEl;

</script>

<Nav {segment} />

<div class="container">
	<Transition refresh={segment}>
	<div class="columns is-gapless is-multiline">
			<div class="column is-full">
				<IntersectionObserver element={headerEl} bind:intersecting={$observing}>
					
					<div class="edra-block no-padding has-text-white" bind:this={headerEl}>
						<Header	options={$page.params && $page.params.slug ? optionsSlug : optionsNormal} />
					</div>
					
				</IntersectionObserver>
			</div>
			<slot/>
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