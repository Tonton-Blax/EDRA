<script>
	import Header from '$lib/layout/HeaderBase.svelte';
	import {observing} from '$lib/utils/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { navigating } from "$app/stores";
	import { isMobileDevice } from '$lib/utils/utils.js';
	import SvelteSeo from "svelte-seo";

	$: isMobile = isMobileDevice();
	$: $navigating && header && header.$destroy();

	let ok = true;
	let headerEl;
	let header;

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
