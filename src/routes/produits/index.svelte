<script context="module">
	export async function preload() {
		const res = await (await this.fetch(`produits.json`)).json();
		const posts = res.map(r => { return {...r.contents, slug : r.slug}})
		return { posts }
	}
</script>

<script>
	import Header from '../../components/Header.svelte'
	import Posts from '../../components/Posts.svelte'
	import { observing } from '../../utils/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { onMount, onDestroy } from 'svelte'
	export let posts;

	let ok = false;
	let headerEl;

	onMount(async()=> {
		ok = true;
	});
	onDestroy(() => ok = false);


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
