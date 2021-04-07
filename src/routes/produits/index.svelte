<script context="module">

export async function load({ fetch }) {
    const res = await (await fetch('produits.json')).json();

    return {
        props: {
            posts: res.map(r => { return {...r.contents, slug : r.slug}})
        }
    };
}

</script>
<script>
	import Header from '$lib/components/Header.svelte'
	import Posts from '$lib/components/Posts.svelte'
	import { observing, allPosts } from '$lib/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	export let posts;

	$: posts.length && allPosts.set(posts)

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