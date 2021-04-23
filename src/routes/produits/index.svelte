<svelte:window on:popstate={notOk()} />
<script context="module">
	export async function preload() {
		const res = await (await this.fetch(`produits.json`)).json();
		const posts = res.map(r => { return {...r.contents, slug : r.slug}})
		return { posts }
	}
</script>

<script>
	import Posts from '../../components/Posts.svelte'
	import Header from '../../components/HeaderBase.svelte';
	import {observing} from '../../utils/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { stores } from '@sapper/app';
	import { tick } from 'svelte';
	import { isMobileDevice } from '../../utils/utils.js';

	const { page,preloading } = stores();
	
	$: ($page.path || $preloading) && notOk();
	$: isMobile = isMobileDevice();

	let ok = true;

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
			<Header headerType={'clair'} />
			{:else}
			<h1 class="title is-1">Chargement...</h1>
			{/if}
		</div>
		
	</IntersectionObserver>
</div>

<div class="spacer" />
<div style="background:var(--lightblue)">
	<Posts {posts} />
</div>


<style>
	.spacer {
		padding:1.45em 1.5rem;
		background:var(--lightblue);
	}
	
</style>
