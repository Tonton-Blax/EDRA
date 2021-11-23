<svelte:window bind:innerWidth={innerWidth}/>
<svelte:head>
	<title>EDRA Concept</title>
</svelte:head>

<script context="module">

	export async function load({ fetch }) {
		const res = await fetch(`/concept.json`);
		if (res.status === 200) {
			return {
				props: {
					concept: await res.json(),
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
	import IntersectionObserver from "svelte-intersection-observer";
	import { fly, fade, scale } from 'svelte/transition';
	import { quadInOut, quadOut } from 'svelte/easing';
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte'
	import Modal from '$lib/layout/Modal.svelte'
	import ContactForm from '$lib/layout/ContactForm.svelte'
	import ChevronLeftIcon from '$lib/layout/ChevronLeftIcon.svelte'
	import ChevronRightIcon from '$lib/layout/ChevronRightIcon.svelte'
	import Header from '$lib/layout/HeaderBase.svelte';
	import { observing } from '$lib/utils/stores.js';
	import { isMobileDevice, getFileName } from '$lib/utils/utils.js';
	import marked from 'marked'
	import { onMount } from 'svelte';
	import { navigating } from "$app/stores";
	export let concept;

	$: $navigating && header && header.$destroy();
	$: isMobile = isMobileDevice();

	let SvelteSeo; let ready;
	let header;


	onMount(async()=>{
		const module = await import('svelte-seo');
        SvelteSeo = module.default;
		ready = true;
	})

	let innerWidth;
	let pictoEl, headerEl, blocConcept;
	let active = false;
	let blocConceptInView = false;
	
	const intersectings = {
		pictos : undefined,
		header : undefined
	}

	const refs = {
		images : [
			"bureaux-boetie-01.jpg",
			"bureaux-boetie-02.jpg",
			"bureaux-boetie-03.jpg",
			"haute-autorite-concurrence-1.jpg",
			"haute-autorite-concurrence-2.jpg",
			"polo-1.jpg",
			"polo-2.jpg",
			"polo-3.jpg",
			"porte-de-versailles-1.jpg",
			"porte-de-versailles-2.jpg",
			"porte-de-versailles-3.jpg",
			"vasque-simple-2.jpg",
			"vasque-simple.jpg",
			"viparis.jpg",
		],
		alts : [
			"bureaux-boetie",
			"bureaux-boetie",
			"bureaux-boetie",
			"haute-autorite-concurrence",
			"haute-autorite-concurrence",
			"polo",
			"polo",
			"polo",
			"porte-de-versailles",
			"porte-de-versailles",
			"porte-de-versailles",
			"vasque-simple",
			"vasque-simple",
			"viparis",
		]
	}

	const overBlocks = [
		{
			index : 0,
			titre : ["Double vasque la Boétie", "Plan vasque simple", "Vasque porte de Versailles"],
			liens : ["/produits/paillasses-endoscopiques", "/produits/postes-de-change-en-kerrock", "/produits/lave-main-ocea"],
			sousTitre : [
				"Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin fusce varius.",
				"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
				"quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas?"
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
			images : [
				'../videos/defonceuse.mp4',
				'../videos/sav.mp4',
				'../videos/livraison.mp4',
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
				'../img/concept/large/kerrock-concept-1.jpg',
				'../img/concept/large/kerrock-concept-2.jpg',
				'../img/concept/large/kerrock-concept-3.jpg',
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

</script>
{#if ready}
<svelte:component this={SvelteSeo}
    title={"EDRA CONCEPT : fabricant français de mobilier sanitaire design sur mesure"}
    description="EDRA CONCEPT conçoit, fabrique, installe meubles et plans-vasques design en résine de synthèse"
	keywords={"Mobilier sanitaire français sur-mesure, lavabos en Kerrock, urinoirs"}
    nofollow={false}
    noindex={false}
    canonical={window.location.href}
    openGraph={{
        title: `EDRA Médical`,
        description: "Fabrication en France sur-mesure de mobilier sanitaire : paillasses, lavabos, vasques, WC, robineterie...",
        url: window.location.href,
        type: 'website',
        images: [
        {
            url: `${window.location.host}/img/logo/edra-blanc.png`,
            width: 486,
            height: 486,
            alt: "Logo Edra Médical"
        }
        ]
    }}
/>
{/if}

	<!-- HEADER -->
	<div class="column is-full">
		<IntersectionObserver element={headerEl} bind:intersecting={$observing}>
			<div class="{isMobile ? 'edra-full' : 'edra-block'} no-padding has-text-white" bind:this={headerEl}>
				<Header headerType={'concept'} bind:this={header} />
			</div>
		</IntersectionObserver>
	</div>	
	
	<!-- MODAL CAROUSEL -->

	<div class="modal-index">
		<Modal bind:active={active}>
			{#if active}
			<div class="modal-carou">
				<Carousel
					perPage={1} controls={true} dots={true} autoplay={30000} duration={500}
				>
				<span class="control" slot="left-control">
					<ChevronLeftIcon />
				</span>
					{#each refs.images as src (src)}
							<img src="../img/concept/large/{src}" alt={refs.alts[currentImageIndex]} /> 
					{/each}
				<span class="control" slot="right-control">
					<ChevronRightIcon />
				</span>
				</Carousel>
			</div>
			{/if}
		</Modal>
	</div>

	<!-- PRODUITS -->

	<div class="column is-full">
		<div class="edra-block no-padding has-text-white">
			{#key overBlocks[0].index}
			<div class="overblock-concept" in:fade={{duration:500}} out:fade={{delay:0, easing:quadInOut}}>
				<div class="flexbase h100">
					<p class="m-6 p-6 is-size-4 has-text-left" style="max-width:50%;">
						{@html marked(concept.images[overBlocks[0].index].headlegend)}
					</p>
				</div>
			</div>
			{/key}
			<div class="carou nomargin bgmm">
			<Carousel 				
				perPage={1} controls={true} dots={true} multipleDrag={false}
				easing={"cubic-bezier(.58,0,.49,.99)"}
				autoplay={overBlocks[0].autoplay} duration={500}
				on:change={ e => changeChapoIndex(0, e.detail.currentSlide) }
			>
				{#each concept.images as src (src)}
					<img src={src.headimage} class="carou-img" alt="nature" /> 
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
				<!--
				<div class="block-up">
						<h3 class="title is-big-touch has-text-info has-text-weight-bold">{overBlocks[0].titre[overBlocks[0].index]}</h3>
				</div>
				-->
				<div class="block-in" style="margin-top:-5em;">
					<p class="has-text-info has-text-left is-size-1">{@html marked(concept.images[overBlocks[0].index].headlegend)}</p>
				</div>
				<!-- 
				<div class="block-bouton">
					<a class="button is-success is-size-3 has-text-bold mt-3" rel="prefetch" href={overBlocks[0].liens[overBlocks[0].index]}>Découvrir</a>
				</div>
				-->
			</div>
			{/key}
		</div>
	</div>

	<!-- 4 PICTOS -->

	<div class="column is-full">
		<div class="no-padding has-background-white has-text-info clear-height-touch" bind:this={pictoEl} class:edra-block={!isMobile}>
			<h2 class="title is-2 has-text-centered has-text-info has-text-weight-bold mb-6 mmt-3 mmb-6 is-big-touch">EDRA, 30 ans <br>de qualité de Service</h2>
			<div class="columns is-mobile is-multiline cols-picto tp-3 full-height">
				<IntersectionObserver bind:intersecting={intersectings.pictos} element={pictoEl} once={isMobile}>
					{#if intersectings.pictos}
					<div out:fly in:fly={{y:200, delay:100, easing:quadOut}} 
						class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_madeinfrance-concept.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-info mpt-2">Fabrication<br>française</h3>
						<p class="is-size-2-touch">EDRA est une entreprise 100% française qui fabrique 100% français.</p>
					</div>
					<div out:fly in:fly={{y:200, delay:250, easing:quadOut}} 
						class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_surmesure-concept.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-info mpt-2">Une production<br>sur mesure</h3>
						<p class="is-size-2-touch">Fonctionnalité, ergonomie, hygiène, esthétisme : 4 mots pour nous guider dans la conception de votre projet.</p>
					</div>
					<div out:fly  in:fly={{y:200, delay:400, easing:quadOut}} 
						class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_tracking-concept.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-info mpt-2">Suivi du projet<br>de A à Z</h3>
						<p class="is-size-2-touch">De la conception à la mise en service dans vos locaux : plusieurs métiers, un seul interlocuteur.</p>
					</div>
					<div out:fly  in:fly={{y:200, delay:550, easing:quadOut}} 
					class="column is-one-fourth is-full-touch has-text-centered col-picto">
						<img src="../img/pictos/picto_livraison-concept.png" width="auto" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 is-size-1-touch has-text-info mpt-2">Intervention<br> dans toute la france</h3>
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
			<div class="concept-bloc no-padding has-text-white" bind:this={blocConcept} style="place-content: start;">
				<div class="columns is-gapless cursorable concept-refs" on:click={()=>active=true}>
					{#if blocConceptInView}
						<div class="column is-half-desktop is-full-touch">
							<div class="columns is-gapless is-multiline">
								<div class="column is-half is-flex">
									<img src="../img/concept/concept-porte-de-versailles-480.jpg" alt="blabla" transition:scale>
								</div>
								<div class="column is-half is-flex">
									<img src="../img/concept/concept-vasue-double-480.jpg" alt="blabla" in:scale={{delay : 100}}>
								</div>
								<div class="column is-half is-flex">
									<img src="../img/concept/concept-vasque-480.jpg" alt="blabla" in:scale={{delay : 200}}>
								</div>
								<div class="column is-half is-flex">
									<img src="../img/concept/concept-double-vasque-480.jpg" alt="blabla" in:scale={{delay : 320}}>
								</div>
							</div>
						</div>
						{#if !isMobile}
						<div class="column is-half">
							<img src="../img/concept/concept-boertie-carre.jpg" alt="blabla" in:scale={{delay : 200}}>
						</div>
						{/if}
					{/if}
				</div>
			</div>
			
		</IntersectionObserver>
	</div>	

	<!-- KERROCK TEXTE -->
	<div class="columns is-multiline is-gapless reverse-columns mb-0">
		<div class="column is-half is-full-touch">
			<div class="edra-block has-background-info has-text-white flex-centered">

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

	<div class="column is-full bgmm snapme">
		<div class="{isMobile ? 'edra-full ontop' : 'edra-block no-padding'} has-text-white has-background-info" style="height:auto;">
			{#key overBlocks[1].index}
			<div class="overtop" in:fly={{x:-overBlocks[1].chapoDirection, duration:700, easing:quadInOut}} out:fly={{x: overBlocks[1].chapoDirection, duration : 700, delay:100, easing:quadInOut}}>
				{#if !isMobile}
				<svg width="214" height="242" viewBox="0 0 154 174" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path 
						d="M76.886 169.052C77.6927 169.052 78.497 168.845 79.2184 168.431L146.556 129.751C147.999 128.923 148.886 127.39 148.886 125.732V48.3736C148.886 46.7157 147.999 45.1822 146.556 44.3544L79.2184 5.67353C78.4958 5.25965 77.6915 5.05151 76.886 5.05151C76.0817 5.05151 75.2761 5.25965 74.5536 5.67353L7.21601 44.3544C5.77447 45.1822 4.88599 46.7157 4.88599 48.3736V125.732C4.88599 127.39 5.77447 128.923 7.21601 129.751L74.5536 168.431C75.2749 168.845 76.0793 169.052 76.886 169.052" 
						stroke="white" stroke-width="9"
					/>
				</svg>
				{/if}

				<div class="sub-overtop">
					<p class="m-0 has-text-left is-size-1-desktop is-big-touch has-text-weight-bold mb-3 has-text-white">
						{@html overBlocks[1].titre[overBlocks[1].index]}
					</p>
					<p class="is-size-5-fullhd is-size-6-desktop is-size-2-touch has-text-left m-0 has-text-white">
						{@html overBlocks[1].sousTitre[overBlocks[1].index]}
					</p>
				</div>
			</div>
			{/key}
	
			<div class="carou special-margin">
				{#if ready}
				<Carousel 
					perPage={1} controls={false} dots={true} multipleDrag={true}
					autoplay={7000} duration={500}
					easing={"cubic-bezier(.58,0,.49,.99)"}
					on:change={ e => changeChapoIndex(1, e.detail.currentSlide) }
				>
					{#each overBlocks[1].images as src, i (src)}
							<video playsinline class="videos-concept" no-controls loop autoplay muted src={src}></video>
					{/each}
				</Carousel>
				{/if}
			</div>
		</div>
	</div>


<style>
	:global(polyline) {
		color:white;
		cursor: pointer;
	}
	.concept-refs div > img {
		filter:none;
		transition:0.4s cubic-bezier(.58,0,.49,.99);
	}
	.concept-refs div > img:hover {
		filter:brightness(0.5);
	}
	.concept-bloc {
		margin-bottom:-7px;
	}
	.overblock-concept {
		position: absolute;
		left: 0px;
		/* max-width: 50%; */
		/* background: rgba(0,0,0,0.2); */
		padding: 30px;
		background : linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 50%)!important;
		z-index: 1;
		pointer-events: none;
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
		pointer-events:all;
		min-width:100%;
		object-fit:cover;
    	margin:0px 0px 0px 0px;
	}
	:global(.carou img) {
		height:695px;
	}
	:global(.carou ul) {
		z-index:19;
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
	@media screen and (min-width: 1024px) {
		.modal-carou img {
			height:85vh;
		}
		.special-margin {
			margin : 0px 0px -6px 0px;
		}

	}
	@media screen and (max-width: 1024px) {
		.col-picto img {
			height: 256px;
			width:auto;
		}
		.modal-carou img {
			height:75vh;
		}
		.concept-bloc {
			margin-bottom:-64px;
		}
		.concept-bloc div img  {
			width:100%!important;
		}
		.overtop {
			margin-top:54vh;
		}
		.ontop {
			justify-content: flex-start!important;
		}
		:global(.carou video) {
			height : 48vh;
		}
		/*
		.snapme {
			scroll-snap-align: start;
			scroll-snap-stop: normal
		}
		*/
	}

</style>