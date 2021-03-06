<svelte:window bind:innerWidth={innerWidth} on:popstate={notOk()} />
<svelte:head>
	<title>EDRA Concept</title>
</svelte:head>

<script>
	import IntersectionObserver from "svelte-intersection-observer";
	import { fly, fade, scale } from 'svelte/transition';
	import { quadInOut, quadOut } from 'svelte/easing';
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte'
	import Header from '../components/HeaderBase.svelte';
	import { observing } from '../utils/stores.js';
	import { stores } from '@sapper/app';
	import { isMobileDevice } from '../utils/utils.js';
	import { tick } from 'svelte';
	import { goto } from '@sapper/app';

	const { page,preloading } = stores();
	
	$: ($page.path || $preloading) && notOk();
	$: isMobile = isMobileDevice();
	$: if (active) 
		onpopstate = () => {
			active = false;
			goto('/');
			const el = document.querySelector('#references');
			el.scrollIntoView();
		};

	let ok = true;

	let notOk = async () => {
		await tick(); 
		ok = false;
		await tick(); 
		ok = true
	}

	let innerWidth;
	let pictoEl, headerEl, blocConcept;
	let active = false;
	let blocConceptInView = false;
	
	const intersectings = {
		pictos : undefined,
		header : undefined
	}


	const overBlocks = [
		{
			index : 0,
			titre : ["Double vasque la Boétie", "Plan vasque simple", "Vasque porte de Versailles"],
			liens : ["/produits/paillasses-endoscopiques", "/produits/postes-de-change-en-kerrock", "/produits/lave-main-ocea"],
			sousTitre : [
				"Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin fusce varius.",
				"Pour une hygiène et un entretien irréprochable",
				"Consultations, chambres, cabinets dentaires… Utilisation : lavage hygiénique (mains, avant-bras)"
			],
			images : [
				'../img/concept/edra-concept-boetie.jpg',
				'../img/concept/edra-concept-plan-vasque-simple.jpg',
				'../img/concept/edra-concept-porte-versailles.jpg'
			],
			chapoDirection : 1000,
			autoplay : 7000
		},
		{
			index : 0,
			titre : ["Savoir-faire", "SAV réactif", "Délais rapides"],
			sousTitre : [
				"37 ans d’expérience. Un suivi de vos projets sur du long terme. Une équipe dédiée et formée spécifiquement à la transformation de la résine de synthèse",
				"Un rappel dans les 4 heures en moyenne pour vous accompagner par téléphone, des interventions rapides sur le terrain si besoin, des pièces détachées toujours en stock",
				"Un process de fabrication local et maitrisé, capable de produire et déployer rapidement, même dans l’urgence"
			],
			color : [
				'white',
				'#005476',
				'white'
			],
			images : [
				'../videos/defonceuse.mp4',
				'../videos/sav.mp4',
				'../img/initial/delais_rapides.jpg',
			],
			chapoDirection : -1000,
			autoplay : 7000
		},
		{
			index : 0,
			sousTitre : [
				"Alliance parfaite de l’acrylique et de la pierre naturelle, Kerrock est résistant, hygiénique, non toxique, réparable et thermoformable. Kerrock® peut se travailler dans une variété de formes quasi illimitée sans aucun joint apparent&nbsp;: le matériau idéal pour les établissements de santé, l’hôtellerie, les espaces publics, les espaces de travail, les magasins.", 
				"Kerrock® est le seul solid-surface fabriqué en Europe dans le respect des normes écologiques, sanitaires et sociales. La proximité des usines permet de réduire fortement l’impact carbone lié au transport.",
				"Ecologique, il est naturellement durable et recyclable. Il peut être rénové, réparé et réutilisé à l’infini. Respectueux de l’environnement et de la santé, il ne contient aucun C.O.V."
			],
			images : [
				'../img/initial/kerrock_1.jpg',
				'../img/initial/kerrock_2.jpg',
				'../img/initial/kerrock_3.jpg',
			],
			chapoDirection : -1000,
			autoplay : 10000
		}
	];

	let currentImageIndex = 0;

	let changeChapoIndex = async (overBlockIndex, idx) => {
		overBlocks[overBlockIndex].chapoDirection = idx > overBlocks[overBlockIndex].index || (idx == 0 && overBlocks[overBlockIndex].index == overBlocks[overBlockIndex].images.length -1) ? -1000 : 1000;
		overBlocks[overBlockIndex].index = idx;
	}

	let openModal = (idx) => {
		active = true;
		currentImageIndex = idx;
	}

</script>

	<!-- HEADER -->
	<div class="column is-full">
		<IntersectionObserver element={headerEl} bind:intersecting={$observing}>
			<div class="{isMobile ? 'edra-full' : 'edra-block'} no-padding has-text-white" bind:this={headerEl}>
				{#if ok}
				<Header headerType={'concept'} />
				{:else}
				<h1 class="title is-1">Chargement...</h1>
				{/if}
			</div>
			
		</IntersectionObserver>
	</div>	
	
	<!-- PRODUITS -->

	<div class="column is-full">
		<div class="edra-block no-padding has-text-white">
			{#key overBlocks[0].index}
			<div class="overblock-concept" in:fade={{duration:500}} out:fade={{delay:0, easing:quadInOut}}>
				<div class="flexbase h100">
					<p class="m-6 p-6 is-size-5">
						{overBlocks[0].sousTitre[overBlocks[0].index]}
					</p>
				</div>
			</div>
			{/key}
			<div class="carou nomargin bgmm">
			<Carousel 				
				perPage={1} controls={true} dots={isMobile} multipleDrag={false}
				easing={"cubic-bezier(.58,0,.49,.99)"}
				autoplay={overBlocks[0].autoplay} duration={500}
				on:change={ e => changeChapoIndex(0, e.detail.currentSlide) }
			>
				{#each overBlocks[0].images as src (src)}
					<img {src} class="carou-img" alt="nature" /> 
				{/each}
			</Carousel>
			</div>
		</div>
	</div>

	<!-- PRODUITS MOBILE -->

	<div class="column is-full is-hidden-desktop border-bottom-mobile">
		<div class="edra-block no-padding flexbase">
		{#key overBlocks[0].index}
			<div class="overblock-mobile" 
			in:fly={{x: overBlocks[0].chapoDirection, duration:500}} 
			out:fly={{x: overBlocks[0].chapoDirection, delay:0, easing:quadInOut}}>
				<div class="block-up">
						<h3 class="title is-big-touch has-text-primary has-text-weight-bold">{overBlocks[0].titre[overBlocks[0].index]}</h3>
					</div>
				<div class="block-in">
					<p class="has-text-primary has-text-left is-size-2">{overBlocks[0].sousTitre[overBlocks[0].index]}</p>
				</div>
				<div class="block-bouton">
					<a class="button is-success is-size-3 has-text-bold mt-3" rel="prefetch" href={overBlocks[0].liens[overBlocks[0].index]}>Découvrir</a>
				</div>
			</div>
			{/key}
		</div>
	</div>

	<!-- 4 PICTOS -->

	<div class="column is-full">
		<div class="edra-block no-padding has-background-white has-text-primary clear-height-touch" bind:this={pictoEl}>
			<h2 class="title is-2 has-text-centered has-text-primary has-text-weight-bold mb-6 mmt-3 mmb-6 is-big-touch">EDRA, 30 ans <br>de qualité de Service</h2>
			<div class="columns is-mobile is-multiline cols-picto tp-3 full-height">
				<IntersectionObserver bind:intersecting={intersectings.pictos} element={pictoEl} once={isMobile}>
					{#if intersectings.pictos}
					<div out:fly in:fly={{y:200, delay:100, easing:quadOut}} 
						class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_madeinfrance.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-primary mpt-2">Fabrication<br>française</h3>
						<p class="is-size-2-touch">EDRA est une entreprise 100% française qui fabrique 100% français.</p>
					</div>
					<div out:fly in:fly={{y:200, delay:250, easing:quadOut}} 
						class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_surmesure.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-primary mpt-2">Une production<br>sur mesure</h3>
						<p class="is-size-2-touch">Fonctionnalité, ergonomie, hygiène, esthétisme : 4 mots pour nous guider dans la conception de votre projet.</p>
					</div>
					<div out:fly  in:fly={{y:200, delay:400, easing:quadOut}} 
						class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_tracking.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-primary mpt-2">Suivi du projet<br>de A à Z</h3>
						<p class="is-size-2-touch">De la conception à la mise en service dans vos locaux : plusieurs métiers, un seul interlocuteur.</p>
					</div>
					<div out:fly  in:fly={{y:200, delay:550, easing:quadOut}} 
					class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_livraison.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-primary mpt-2">Intervention<br> dans toute la france</h3>
						<p class="is-size-2-touch">Livraison, installation ou maintenance, nous nous déplaçons dans toute la France Métropolitaine.</p>
					</div>
					{/if}
				</IntersectionObserver>
			</div>
		</div>
	</div>

	<!-- NOUVEAU BLOC CONCEPT 4IMAGES + 1 A DROITE -->

	<div class="column is-full">
		<IntersectionObserver element={blocConcept} bind:intersecting={blocConceptInView}>
			<div class="{isMobile ? 'edra-full' : 'edra-block'} no-padding has-text-white" bind:this={blocConcept} style="place-content: start;">
				<div class="columns is-gapless">
					{#if blocConceptInView}
					<div class="column is-half">
						<div class="columns is-gapless is-multiline">
							<div class="column is-half is-flex">
								<img src="../img/concept/concept-porte-de-versailles-480.jpg" alt="blabla" transition:scale>
							</div>
							<div class="column is-half is-flex">
								<img src="../img/concept/concept-vasue-double-480.jpg" alt="blabla" style="max-width:101%;" in:scale={{delay : 100}}>
							</div>
							<div class="column is-half is-flex">
								<img src="../img/concept/concept-vasque-480.jpg" alt="blabla" in:scale={{delay : 200}}>
							</div>
							<div class="column is-half is-flex">
								<img src="../img/concept/concept-double-vasque-480.jpg" alt="blabla" style="max-width:101%;" in:scale={{delay : 320}}>
							</div>
						</div>
					</div>
					<div class="column is-half">
						<img src="../img/concept/concept-boertie-carre.jpg" alt="blabla" in:scale={{delay : 200}}>
					</div>
					{/if}
				</div>
			</div>
			
		</IntersectionObserver>
	</div>	

	<!-- KERROCK TEXTE -->
	<div class="columns is-multiline is-gapless reverse-columns mb-0">
		<div class="column is-half is-full-touch">
			<div class="edra-block has-background-info has-text-white flex-centered" >

				{#key overBlocks[2].index}
				<a class="flexbase has-text-white mince"  
					in:fly={{x:overBlocks[2].chapoDirection, duration:500, easing:quadInOut}} out:fly={{x:overBlocks[2].chapoDirection, easing:quadInOut}} 
					href='https://www.kerrock.fr/sanitaire'
				>
					<h2 class="title is-2 has-text-white mb-0 is-bigger-touch">Kerrock®</h2>
					<p class="is-size-6-desktop is-size-3-tablet is-med-mob has-text-left">
						{@html overBlocks[2].sousTitre[overBlocks[2].index]}
					</p>
				</a>
				{/key}

			</div>
		</div>

		<!-- KERROCK IMAGES -->

		<div class="column is-half is-full-touch bgmm">
			<div class="edra-block no-padding has-background-white has-text-primary bm1">
				<div class="carou nomargin">
				<Carousel 				
					perPage={1} controls={true} dots={true} multipleDrag={false}
					autoplay={overBlocks[2].autoplay} duration={500}
					easing={"cubic-bezier(.58,0,.49,.99)"}
					on:change={ e => changeChapoIndex(2, e.detail.currentSlide) }
				>				
					{#each overBlocks[2].images as src (src)}
						<img {src} class="carou-img-half" alt="nature" />
					{/each}
					</Carousel>
				</div>
			</div>
		</div>
	</div>

	<!-- POINTS FORTS -->

	<div class="column is-full bgmm">
		<div class="{isMobile ? 'edra-full' : 'edra-block'} no-padding has-text-white">
			{#key overBlocks[1].index}
			<div class="overtop" in:fly={{x:-overBlocks[1].chapoDirection, duration:700, easing:quadInOut}} out:fly={{x: overBlocks[1].chapoDirection, duration : 700, delay:100, easing:quadInOut}}>
				
				<svg width="214" height="242" viewBox="0 0 154 174" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path 
						d="M76.886 169.052C77.6927 169.052 78.497 168.845 79.2184 168.431L146.556 129.751C147.999 128.923 148.886 127.39 148.886 125.732V48.3736C148.886 46.7157 147.999 45.1822 146.556 44.3544L79.2184 5.67353C78.4958 5.25965 77.6915 5.05151 76.886 5.05151C76.0817 5.05151 75.2761 5.25965 74.5536 5.67353L7.21601 44.3544C5.77447 45.1822 4.88599 46.7157 4.88599 48.3736V125.732C4.88599 127.39 5.77447 128.923 7.21601 129.751L74.5536 168.431C75.2749 168.845 76.0793 169.052 76.886 169.052" 
						stroke="{overBlocks[1].color[overBlocks[1].index]}" stroke-width="9"
					/>
				</svg>

				<div class="sub-overtop">
					<p class="m-0 has-text-left is-size-1-desktop is-big-touch has-text-weight-bold mb-3" style="color:{overBlocks[1].color[overBlocks[1].index]}">
						{@html overBlocks[1].titre[overBlocks[1].index]}
					</p>
					<p class="is-size-5-fullhd is-size-6-desktop is-size-2-touch has-text-left m-0" style="color:{overBlocks[1].color[overBlocks[1].index]}">
						{@html overBlocks[1].sousTitre[overBlocks[1].index]}
					</p>
				</div>
			</div>
			{/key}
	
			<div class="carou nomargin">
				<Carousel 
					perPage={1} controls={false} dots={true} multipleDrag={true}
					autoplay={overBlocks[1].autoplay} duration={500}
					easing={"cubic-bezier(.58,0,.49,.99)"}
					on:change={ e => changeChapoIndex(1, e.detail.currentSlide) }
				>
					{#each overBlocks[1].images as src, i (src)}
					<!--
						<img
							alt="{src}"
							sizes="(max-width: 1345px) 100vw, 1000px"
							srcset="g/img/initial/{src}-400.webp 480w, g/img/initial/{src}-600.webp 768w, g/img/initial/{src}-1200.webp 1024w"
						>
					-->
						{#if src.endsWith('mp4')}
							<video no-controls loop autoplay muted="muted" src={src}></video>
						{:else}
							<img src={src} class="carou-img" alt="nature"/>
						{/if}			
					{/each}
				</Carousel>
			</div>
		</div>
	</div>

<style>

	.overblock-concept {
		position: absolute;
		left: 0px;
		z-index: 1;
		max-width: 50%;
		background: rgba(0,0,0,0.2);
		padding: 30px;
		height: inherit;
	}
	.h100 {
		height:100%;
	}
	.col-picto img {
		height: 128px;
		width:auto;
	}
	.cols-picto {
		padding:0% 10%;
	}
	
	p {
		text-align: center;
		margin: 0 auto;
	}

	.nomargin {
		margin:0px 0px 0px 0px!important;
	}
	:global(.carou img), :global(.carou video) {
		width: fit-content;
		min-width:100%;
		object-fit:cover;
		height:695px;
    	margin:0px 0px 0px 0px;
	}
	p {
		margin: 1em auto;
	}
	
	:global(.button) {
		text-transform: uppercase;
		border-radius:0px!important;
	}

	@keyframes -global-slide-in-bottom {
		0% {
			-webkit-transform: translateY(1000px);
					transform: translateY(1000px);
			opacity: 0;
		}
		100% {
			-webkit-transform: translateY(0);
					transform: translateY(0);
			opacity: 1;
		}
	}
	@media screen and (max-width: 1024px) {
		.col-picto img {
			height: 256px;
			width:auto;
		}
	}

</style>