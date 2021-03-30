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

</script>

<svelte:head>
	<title>Produits EDRA Médical</title>
</svelte:head>
	<div class="container">
		<div class="columns is-multiline is-gapless p-0 has-background-primary-light cols-produits">

			<div class="column is-full">
				<IntersectionObserver bind:intersecting={$observing} element={headerEl} >
					<div class="edra-block no-padding has-text-white" bind:this={headerEl}>
						<Header />
					</div>
				</IntersectionObserver>
			</div>
		</div>
		<Posts {posts} />
	</div>
