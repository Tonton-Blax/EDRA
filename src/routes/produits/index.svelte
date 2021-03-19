<script context="module" lang="ts">
	export function preload() {
		return this.fetch(`produits.json`).then((r: { json: () => any; }) => r.json()).then((posts: { slug: string; title: string, html: any }[]) => {
			return { posts };
		});
	}
</script>

<script lang="ts">
	export let posts: { slug: string; title: string, html: any }[];
	import Header from '../../components/Header.svelte'
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
		<div class="columns is-multiline has-background-primary-light cols-produits ml-0 mr-0">

			{#each posts as post}
			<div class="column is-one-third mt-5 mb-1 ml-1 mr-1">
				<div class="card">
					<div class="card-image">
						<figure class="image is-4by3">
							<img src="https://bulma.io/images/placeholders/1280x960.png" alt="{post.title}">
						</figure>
					</div>
					<div class="card-content">		  
						<div class="content">
							<h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">{post.title}</h2>
						</div>
					</div>
					<footer class="card-footer">
						<a rel="prefetch" href="produits/{post.slug}" class="button is-success is-uppercase">découvrir</a>
					</footer>
				</div>
			</div>
			{/each}
		</div>
	</div>

<style>

	.button {
		border-radius:0px;
	}
	.image img {
		height : 100%;
	}
</style>
