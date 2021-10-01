<svelte:window on:popstate={notOk()} />
<script context="module">

	export async function load({ fetch }) {
		const res = await fetch(`/produits.json`);
		if (res.status === 200) {
			return {
				props: {
					posts: await res.json(),
				}
			};
		}
		if (res.status == 404) {
			return {
				status: res.status,
				error: new Error('This page does not exist')
			}
		}
		else {
			return {
				props : {posts : null},
				status: res.status,
				error: new Error(`There was an error while loading the article`)
			}
		};
	}
</script>

<script>
	import Posts from '$lib/layout/Posts.svelte'
	import Header from '$lib/layout/HeaderBase.svelte';
	import {observing} from '$lib/utils/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { tick } from 'svelte';
	import { navigating } from "$app/stores";
	import { isMobileDevice } from '$lib/utils/utils.js';

	$: isMobile = isMobileDevice();
	$: $navigating && header && header.$destroy();

	let ok = true; 
	let header;

	let notOk = async () => {
		await tick(); 
		ok = false;
		await tick(); 
		ok = true
	}
	export let posts;

	let headerEl;
</script>

<svelte:head>
	<title>Produits EDRA Médical</title>
</svelte:head>

<div class="column is-full">
	<IntersectionObserver element={headerEl} bind:intersecting={$observing}>
		<div class="{isMobile ? 'edra-full' : 'edra-block'} no-padding has-text-white" bind:this={headerEl}>
			{#if ok}
			<Header headerType={isMobile ? 'sombreMobile' : 'clair'} bind:this={header} />
			{:else}
			<h1 class="title is-1">Chargement...</h1>
			{/if}
		</div>
		
	</IntersectionObserver>
</div>

<div class="spacer" />
<div style="background:var(--lightblue);width:100%;">
	<Posts {posts} />
</div>


<style>
	.spacer {
		padding:1.45em 1.5rem;
		background:var(--lightblue);
	}
	
</style>
