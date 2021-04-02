<script context="module">
	export async function preload() {
		let posts = await (await this.fetch(`produits.json`)).json();
		return {posts}
	}
</script>

<script>
	export let posts;
	import Header from '../../components/Header.svelte'
	import Posts from '../../components/Posts.svelte'
	import { observing } from '../../utils/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	let headerEl;
	import { stores } from '@sapper/app';
	const { page } = stores();

	let ok = true;
	$: $page.path && notOk();
	function timeout(ms) {
    	return new Promise(resolve => setTimeout(resolve, ms));
	}
	let notOk = async () => {ok = false; await timeout(100); ok = true;}
	

</script>

<svelte:head>
	<title>Produits EDRA Médical</title>
</svelte:head>
	<div class="container">
		<div class="columns is-multiline is-gapless p-0 has-background-primary-light cols-produits">
			<div class="column is-full">
				{#if ok}
				<IntersectionObserver bind:intersecting={$observing} element={headerEl} >
					<div class="edra-block no-padding has-text-white" bind:this={headerEl}>
						<Header />
					</div>
				</IntersectionObserver>
				{/if}
			</div>
		</div>
		<Posts {posts} />
	</div>
