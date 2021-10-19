<svelte:window on:popstate={notOk()} />
<script context="module">

	export async function load({ fetch, page }) {
		const {query} = page;
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
	import { page } from '$app/stores';
	import SvelteSeo from "svelte-seo";

	export let posts;
	posts.sort( (a, b)  => (a.ordre || 1) - (b.ordre || 0) )

	$: isMobile = isMobileDevice();
	$: $navigating && header && header.$destroy();
	$: currentLevel = $page.query && $page.query.get('level') || 0;
	
	let ok = true;
	let headerEl;
	let header;

	let notOk = async () => {
		await tick(); 
		ok = false;
		await tick(); 
		ok = true
	}

</script>

<svelte:head>
	<title>Produits EDRA Médical</title>
</svelte:head>

<SvelteSeo
    title={"Edra Médical : fabrication française et agencement médical sur mesure depuis 1983"}
	canonical={ "https://www.edramedical.fr/produits"}
    description={"Edra Médical conçoit, fabrique, installe des paillasses sur mesure, plans-vasques, meubles à langer, auges, lavabos chirurgicaux pour les établissements de santé, maternité, crèches"}
	openGraph={{
        title: "Edra Médical : fabrication française et agencement médical sur mesure depuis 1983",
        description: "Edra Médical conçoit, fabrique, installe des paillasses sur mesure, plans-vasques, meubles à langer, auges, lavabos chirurgicaux pour les établissements de santé, maternité, crèches",
        url: "https://www.edramedical.fr/produits",
        type: 'website',
        images: [
        {
            url: `https://www.edramedical.fr/img/initial/bloctop.jpg`,
            width: 1151,
            height: 575,
            alt: "Logo Edra Médical sur fond graphique"
        }
        ]
    }}
/>

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
	<Posts {posts} {currentLevel} />
</div>


<style>
	.spacer {
		padding:1.45em 1.5rem;
		background:var(--lightblue);
	}
	
</style>
