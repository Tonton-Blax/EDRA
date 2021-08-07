<svelte:window bind:innerWidth={innerWidth} on:popstate={notOk()} />
<svelte:head>
	<title>EDRA Médical</title>
	<link rel="preload" as="video" href="../videos/defonceuse.mp4">
	<link rel="preload" as="video" href="../videos/sav.mp4">
	<link rel="preload" as="video" href="../videos/livraison.mp4">
</svelte:head>
<script context="module">
	export function preload({ params, query }) {
	  return this.fetch("sitemap.xml");
	}
  </script>
<script>
	//import {chunk, shuffleArray } from '../utils/utils.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { fly } from 'svelte/transition';
	import { quadInOut, quadOut } from 'svelte/easing';
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte'
	import Modal from 'svelma/src/components/Modal/Modal.svelte'
	import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'
	import Header from '../components/HeaderBase.svelte';
	import { observing } from '../utils/stores.js';
	import { stores } from '@sapper/app';
	import { isMobileDevice } from '../utils/utils.js';
	import { tick, onMount } from 'svelte';
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
	let pictoEl, headerEl;
	let active = false;

	const intersectings = {
		pictos : undefined,
		header : undefined
	}

	let SvelteSeo; let ready; let vids;
	onMount(async()=>{
		const module = await import('svelte-seo');
        SvelteSeo = module.default;
		vids = document.querySelectorAll(`.videos-concept`);
		ready = true;
	});

	const refs = {
		logos : [
			"../img/logos/logo-chu-bayeux.jpg",
			"../img/logos/logo-chu-limoges.jpg",
			"../img/logos/logo-clinique-jouvenet.jpg",
			"../img/logos/logo-clinique-maussins.jpg",
			"../img/logos/logo-creche-modigliani.jpg",
			"../img/logos/logo-fondation-rotschild.jpg",
			"../img/logos/logo-hopital-ballanger.jpg",
			"../img/logos/logo-hopital-pompidou.jpg",
			"../img/logos/logo-maternite-reuilly.jpg"
		],
		images : [
			["bayeux-01.jpg"],
			["limoges-01.jpg"],
			["jouvenet-01.jpg", "jouvenet-02.jpg", "jouvenet-03.jpg"],
			["maussins-01.jpg","maussins-02.jpg"],
			["modigliani-02.jpg", "modigliani-03.jpg","modigliani-04.jpg","modigliani-05.jpg","modigliani-07.jpg","modigliani-08.jpg","modigliani-09.jpg","modigliani-10.jpg","modigliani-11.jpg","modigliani-18.jpg","modigliani-19.jpg","modigliani-21.jpg","modigliani-23.jpg","modigliani-24.jpg","modigliani-27.jpg"],
			["fondation-rothschild-01.jpg","fondation-rothschild-02.jpg","fondation-rothschild-03.jpg","fondation-rothschild-04.jpg","fondation-rothschild-05.jpg"],
			["ballanger-01.jpg"],
			["pompidou-01.jpg"],
			["reuilly-01.jpg","reuilly-02.jpg","reuilly-03.jpg","reuilly-04.jpg","reuilly-05.jpg","reuilly-06.jpg","reuilly-07.jpg","reuilly-08.jpg","reuilly-09.jpg","reuilly-10.jpg","reuilly-11.jpg","reuilly-12.jpg","reuilly-13.jpg","reuilly-14.jpg","reuilly-15.jpg","reuilly-16.jpg","reuilly-17.jpg"]
		],
		alts : [
			"Centre Hospitalier Aunay-Bayeux",
			"Centre Hospitalier Universitaire Limoges",
			"Clinique Jouvenet, Groupe Ramsay Santé",
			"Clinique Maussins Nollet, Groupe Ramsay Santé",
			"Crèche Modigliani",
			"Fondation de Rotschild",
			"Centre Hospitalier Intercommunal Robert Ballanger",
			"Hôpital Européen Georges Pompidou",
			"Maternité Reuilly, Groupe Hospitalier Diaconesses Croix Saint-Simon",
		]
	}

	const overBlocks = [
		{
			index : 0,
			titre : ["Paillasses endoscopiques", "Postes de change en Kerrock", "Lave-main Ocea"],
			liens : ["/produits/paillasses-endoscopiques", "/produits/postes-de-change-en-kerrock", "/produits/lave-main-ocea"],
			sousTitre : [
				"Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin fusce varius.",
				"Pour une hygiène et un entretien irréprochable",
				"Consultations, chambres, cabinets dentaires… Utilisation : lavage hygiénique (mains, avant-bras)"
			],
			images : [
				'../img/initial/paillasse_endoscopique.jpg',
				'../img/uploads/poste-de-change-sur-mesure-01.jpg',
				'../img/uploads/lave-main-ocea-01.jpg'
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
				'../videos/livraison.mp4',
			],
			chapoDirection : -1000,
			autoplay : 0
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
	let wrapperCarousel;

	let changeChapoIndex = async (overBlockIndex, idx) => {
		overBlocks[overBlockIndex].chapoDirection = idx > overBlocks[overBlockIndex].index || (idx == 0 && overBlocks[overBlockIndex].index == overBlocks[overBlockIndex].images.length -1) ? -1000 : 1000;
		overBlocks[overBlockIndex].index = idx;
	}

	let openModal = (idx) => {
		active = true;
		currentImageIndex = idx;
	}

</script>

<!-- SEO -->
{#if ready}
<svelte:component this={SvelteSeo}
    title={"Edra médical"}
    description="Fabrication en France de mobilier médical : paillasses endoscopiques, lavabos pour lavage chirurgical, modules endoscopiques, vasques"
	keywords="Lavabos chirurgicaux, Paillasses sèches et humides en Kerrock, Postes de change en Kerrock,Paillasses endoscopiques, matériel médical sur-mesure fabrication française, fabrication de mobilier sanitaire en urgence"
    nofollow={false}
    noindex={false}
    canonical={window.location.href}
    openGraph={{
        title: `EDRA Médical`,
        description: "Fabrication en France de mobilier médical : paillasses endoscopiques, lavabos pour lavage chirurgical, modules endoscopiques, vasques",
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

<!-- MODAL -->

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
				{#each refs.images[currentImageIndex] as src (src)}
						<img src="../img/refs/{src}" alt={refs.alts[currentImageIndex]} /> 
				{/each}
			<span class="control" slot="right-control">
				<ChevronRightIcon />
			</span>
			</Carousel>
		</div>
		{/if}
	</Modal>
</div>

	<!-- HEADER -->
		
	<div class="column is-full">
		<IntersectionObserver element={headerEl} bind:intersecting={$observing}>
			<div class="{isMobile ? 'edra-full' : 'edra-block'} no-padding has-text-white" bind:this={headerEl}>
				{#if ok}
				<Header headerType={'sombre'} />
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
			<div class="overblock" in:fly={{x:1000, duration:500}} out:fly={{x:1000, delay:0, easing:quadInOut}}>
				<div class="block-up">
						<h3 class="title is-3 has-text-primary has-text-weight-bold">{overBlocks[0].titre[overBlocks[0].index]}</h3>
					</div>
				<div class="block-in">
					<p class="has-text-primary has-text-left">{overBlocks[0].sousTitre[overBlocks[0].index]}</p>
				</div>
				<div class="block-bouton">
					<a class="button is-success" rel="prefetch" href={overBlocks[0].liens[overBlocks[0].index]}>Découvrir</a>
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
	<!-- KERROCK TEXTE -->
	<div class="columns is-multiline is-gapless reverse-columns mb-0">
		<div class="column is-half is-full-touch">
			<div class="edra-block has-background-primary has-text-white flex-centered" >

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
		<div class="{isMobile ? 'edra-full ontop' : 'edra-block no-padding'} has-text-white has-background-primary" style="height:auto;">
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
							<video class="videos-concept" no-controls loop autoplay muted="muted" src={src}></video>
					{/each}
				</Carousel>
				{/if}
			</div>
		</div>
	</div>

	<!-- REFERENCES -->

	<div class="column is-half is-full-touch bgmm">
		<div class="edra-block has-background-primary has-text-white p-0">
			<h2 class="title is-2 has-text-white has-text-centered mb-0 is-bigger-touch">Ils nous font<br>confiance</h2>
		</div>
	</div>
	<div class="column is-half is-full-touch">
		<div id="references" class="edra-block no-padding has-background-white has-text-primary carou-ref references" style="margin-left:1px;" bind:this={wrapperCarousel}>
			<!-- <img class="autoheight" src="../img/kerrock02.jpg" alt="Hall d'accueil avec revêtement en kerrock"> -->
			<Carousel 				
				perPage={3} controls={false} dots={false} multipleDrag={false}
				autoplay={0} duration={0} draggable={false}
			>
				{#each refs.logos.slice(0,3) as logo, chunkIndex}
						<div style="display: flex;" class="cursorable" on:click={() => openModal(chunkIndex) } >
							<span class="logosquare"><img class="resize is-square" width="256" height="256" src={logo} alt="logo-"/></span>
						</div>
				{/each}
			</Carousel>

			<Carousel 				
				perPage={3} controls={false} dots={false} multipleDrag={false}
				autoplay={0} duration={0} draggable={false}
			>
				{#each refs.logos.slice(3,6) as logo, chunkIndex}
					<div style="display: flex;" class="cursorable" on:click={() => openModal(chunkIndex+3) } >
						<span class="logosquare"><img class="resize is-square" width="256" height="256" src={logo} alt="logo-"/></span>
					</div>
				{/each}
			</Carousel>

			<Carousel 				
				perPage={3} controls={false} dots={false} multipleDrag={false}
				autoplay={0} duration={0} draggable={false}
			>
				{#each refs.logos.slice(6,9) as logo, chunkIndex}
					<div style="display: flex;" class="cursorable" on:click={() => openModal(chunkIndex+6) } >
						<span class="logosquare"><img class="resize is-square" width="256" height="256" src={logo} alt="logo-"/></span>
					</div>
				{/each}
			</Carousel>
		</div>
	</div>

<style>
	.col-picto img {
		height: 128px;
		width:auto;
	}
	.cols-picto {
		padding:0% 10%;
	}
	
	.control :global(svg) {
		width: 100%;
		height: 100%;
		color: #fff;
		z-index:5000;
		cursor:pointer;
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
    	margin:0px 0px 0px 0px;
	}
	:global(.carou img) {
		height:695px;
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
		.references {
			min-height: 860px;
		}
		.col-picto img {
			height: 256px;
			width:auto;
		}
		.modal-carou img {
			height:75vh;
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
		:global(body) {
			scroll-snap-type: y proximity;
  			/* Reserve space for header plus some extra space for sneak peeking. */
  			overflow-y: scroll;
			height:100vh;
		}
		.snapme {
			scroll-snap-align: start;
			scroll-snap-stop: normal
		}

	}

</style>