<script context="module">

export async function load({ fetch }) {
    const res = await fetch('/produits.json');
    return {
        props: {
            posts: await res.json()
        }
    };
}

</script>
<script>
	export let posts;
	import Header from '$lib/components/Header.svelte'
	import Posts from '$lib/components/Posts.svelte'
	import { observing } from '$lib/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { page } from '$app/stores';
	$: $page.path && notOk();
	let ok = true;
	function timeout(ms) {
    	return new Promise(resolve => setTimeout(resolve, ms));
	}

	let notOk = async () => {ok = false; await timeout(100); ok = true;}

	let headerEl;
	
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