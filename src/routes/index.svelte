<svelte:window bind:innerWidth={innerWidth} />
<svelte:head>
	<title>EDRA Médical</title>
</svelte:head>

<script>
	import {chunk, shuffleArray } from '../utils/utils.js';
	import IntersectionObserver from "svelte-intersection-observer";
	import { fly } from 'svelte/transition';
	import { quadInOut, quadOut } from 'svelte/easing';
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte'
	
	let innerWidth;
	let pictoEl;
	
	const intersectings = {
		pictos : undefined,
		header : undefined
	}

	const imagesLogos= [
		"../img/logos/tenon.png",
		"../img/logos/necker.png",
		"../img/logos/sainte-anne.png",
		"../img/logos/hopital-suisse.png",
		"../img/logos/bichat.png",
		"../img/logos/rothschild-aphp.png",
		"../img/logos/fondation_rotschild.png",
		"../img/logos/blueuts.png",
		"../img/logos/foch.png"
	]

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
			]
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
				'../img/initial/equipe1.jpg',
				'../img/initial/delais_rapides.jpg',
				'../img/initial/sav_reactif.jpg'
			]
		},
		{
			index : 0,
			sousTitre : [
				"Alliance parfaite de l’acrylique et de la pierre naturelle, Kerrock est résistant, hygiénique, non toxique, réparable et thermoformable. Kerrock® peut se travailler dans une variété de formes quasi illimitée sans aucun joint apparent : le matériau idéal pour les établissements de santé, l’hôtellerie, les espaces publics, les espaces de travail, les magasins.", 
				"Kerrock® est le seul solid-surface fabriqué en Europe dans le respect des normes écologiques, sanitaires et sociales. La proximité des usines permet de réduire fortement l’impact carbone lié au transport.",
				"Ecologique, il est naturellement durable et recyclable. Il peut être rénové, réparé et réutilisé à l’infini. Respectueux de l’environnement et de la santé, il ne contient aucun C.O.V."
			],
			images : [
				'../img/initial/kerrock_1.jpg',
				'../img/initial/kerrock_2.jpg',
				'../img/initial/kerrock_3.jpg',
			]
		}
	];

</script>

	<!-- PRODUITS -->

	<div class="column is-full">
		<div class="edra-block no-padding has-text-white">
			{#key overBlocks[0].index}
			<div class="overblock" in:fly={{x:-1000, duration:500}} out:fly={{x:1000, delay:100, easing:quadInOut}}>
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
			<div class="carou">
			<Carousel 				
				perPage={1} controls={true} dots={false} multipleDrag={false}
				autoplay={5000} duration={500}
				on:change={ e => overBlocks[0].index = e.detail.currentSlide }
			>
				{#each overBlocks[0].images as src (src)}
					<img {src} class="carou-img" alt="nature" /> 
				{/each}
			</Carousel>
			</div>
		</div>
	</div>

	<!-- 4 PICTOS -->

	<div class="column is-full">
		<div class="edra-block no-padding has-background-white has-text-primary" bind:this={pictoEl}>
			<h2 class="title is-2 has-text-centered has-text-primary has-text-weight-bold mb-6">EDRA, 30 ans <br>de qualité de Service</h2>
			<div class="columns cols-picto">
				<IntersectionObserver bind:intersecting={intersectings.pictos} element={pictoEl}>
					{#if intersectings.pictos}
					<div out:fly in:fly={{y:200, delay:100, easing:quadOut}} class="column is-one-fourth has-text-centered col-picto">
						<img src="../img/pictos/picto_demoulable.png" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 has-text-primary">Fabrication<br>française</h3>
						<p>EDRA est une entreprise 100% française qui fabrique 100% français.</p>
					</div>
					<div out:fly in:fly={{y:200, delay:250, easing:quadOut}} class="column is-one-fourth has-text-centered col-picto">
						<img src="../img/pictos/picto_tracking.png" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 has-text-primary">Une production<br>sur mesure</h3>
						<p>Fonctionnalité, ergonomie, hygiène, esthétisme : 4 mots pour nous guider dans la conception de votre projet.</p>
					</div>
					<div out:fly  in:fly={{y:200, delay:400, easing:quadOut}} class="column is-one-fourth has-text-centered col-picto">
						<img src="../img/pictos/picto_madeinfrance.png" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 has-text-primary">Suivi du projet<br>de A à Z</h3>
						<p>De la conception à la mise en service dans vos locaux : plusieurs métiers, un seul interlocuteur.</p>
					</div>
					<div out:fly  in:fly={{y:200, delay:550, easing:quadOut}} class="column is-one-fourth has-text-centered col-picto">
						<img src="../img/pictos/picto_livraison.png" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 has-text-primary">Intervention<br> dans toute la france</h3>
						<p>Livraison, installation ou maintenance, nous nous déplaçons dans toute la France Métropolitaine.</p>
					</div>
					{/if}
				</IntersectionObserver>
			</div>
		</div>
	</div>

	<!-- KERROCK TEXTE -->

	<div class="column is-half">
		<div class="edra-block has-background-primary has-text-white" >

			{#key overBlocks[2].index}
			<a class="flexbase has-text-white" 
				style="position:absolute;max-width:21%;" 
				in:fly={{x:-1000, duration:500, easing:quadInOut}} out:fly={{x:1000, delay:100, easing:quadInOut}} 
				href='https://www.kerrock.fr/sanitaire'
			>
				<h2 class="title is-2 has-text-white mb-0">Kerrock®</h2>
				<p class="is-size-6 has-text-left">
					{@html overBlocks[2].sousTitre[overBlocks[2].index]}
				</p>
			</a>
			{/key}

		</div>
	</div>

	<!-- KERROCK IMAGES -->

	<div class="column is-half">
		<div class="edra-block no-padding has-background-white has-text-primary">
			<div class="carou">
			<Carousel 				
				perPage={1} controls={false} dots={true} multipleDrag={false}
				autoplay={5000} duration={500}
				on:change={ e => overBlocks[2].index = e.detail.currentSlide }
			>				
				{#each overBlocks[2].images as src (src)}
					<img {src} class="carou-img-half" alt="nature" />
				{/each}
				</Carousel>
			</div>
		</div>
	</div>

	<!-- POINTS FORTS -->

	<div class="column is-full">
		<div class="edra-block no-padding has-text-white">
			<div class="overtop" style="display:flex;flex-flow:row;">
				<img src="../img/svg/hexagone.svg" alt="hexagone" style="width:214px!important;">
				{#key overBlocks[1].index}
					<div class="sub-overtop" in:fly={{x:-1000, duration:500}} out:fly={{x:1000, delay:100, easing:quadInOut}}>
							<p class="m-0 has-text-left is-size-1 has-text-weight-bold mb-3" >
								{@html overBlocks[1].titre[overBlocks[1].index]}
							</p>
							<p class="is-size-5-fullhd is-size-6-desktop has-text-left has-text-white m-0">
								{@html overBlocks[1].sousTitre[overBlocks[1].index]}
							</p>
					</div>
				{/key}
			</div>
	
			<div class="carou">
				<Carousel 
					perPage={1} controls={false} dots={true} multipleDrag={false}
					autoplay={0} duration={500}
					on:change={ e => overBlocks[1].index = e.detail.currentSlide }
				>
					{#each overBlocks[1].images as src (src)}
						<img {src} class="carou-img" alt="nature"/>
					{/each}
				</Carousel>
			</div>
		</div>
	</div>

	<!-- REFERENCES -->

	<div class="column is-half">
		<div class="edra-block has-background-primary has-text-white p-0">
			<h2 class="title is-2 has-text-white has-text-centered mb-0">Ils nous font<br>confiance</h2>
		</div>
	</div>
	<div class="column is-half">
		<div class="edra-block no-padding has-background-white has-text-primary" style="margin-left:1px;">
			<!-- <img class="autoheight" src="../img/kerrock02.jpg" alt="Hall d'accueil avec revêtement en kerrock"> -->
			<Carousel 				
				perPage={1} controls={false} dots={true} multipleDrag={false}
				autoplay={5000} duration={500}
				on:change={ e => overBlocks[0].index = e.detail.currentSlide }
			>
			{#each chunk(shuffleArray(imagesLogos), 3) as logos, chunkIndex (chunkIndex)}
					<div style="display: flex;">
					{#each logos as logo (logo)}
					<span class="logosquare"><img class="resize is-square" src={logo} alt="logo-"/></span>
					{/each}
					</div>
				{/each}
			</Carousel>
			<Carousel 				
				perPage={1} controls={false} dots={true} multipleDrag={false}
				autoplay={5000} duration={500}
				on:change={ e => overBlocks[0].index = e.detail.currentSlide }
			>
			{#each chunk(shuffleArray(imagesLogos), 3) as logos, chunkIndex (chunkIndex)}
					<div style="display: flex;">
					{#each logos as logo (logo)}
					<span class="logosquare"><img class="resize is-square" src={logo} alt="logo-"/></span>
					{/each}
					</div>
				{/each}
			</Carousel>	
			<Carousel 				
				perPage={1} controls={false} dots={true} multipleDrag={false}
				autoplay={5000} duration={500}
				on:change={ e => overBlocks[0].index = e.detail.currentSlide }
			>
				{#each chunk(shuffleArray(imagesLogos), 3) as logos, chunkIndex (chunkIndex)}
					<div style="display: flex;">
					{#each logos as logo (logo)}
					<span class="logosquare"><img class="resize is-square" src={logo} alt="logo-"/></span>
					{/each}
					</div>
				{/each}
			</Carousel>
		</div>
	</div>

<style>
	
	.logosquare {
		border: 1px solid #efefef;
		margin:0px;
		height:224px;
		padding:0px;
		width:100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 34px;
	}
	.logosquare img {
		object-fit:contain;
		margin:0em!important;
	}
	.col-picto img {
		height: 128px;
		width:auto;
	}
	.cols-picto {
		padding:0% 10%;
	}
	.sub-overtop {
		display: flex;
		position:absolute;
		left:80%;
		flex-flow:column;
		width:calc(100% + 8vw);
	}
	
	p {
		text-align: center;
		margin: 0 auto;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}
	.carou {
		margin:0px 0px 0px 0px!important;
	}
	.carou img {
		width: fit-content;
		min-width:100%;
		object-fit:cover;
		height:695px;
    	margin:0px 0px 0px 0px!important;
	}

	.carou-img-half {
		min-height: 672px;
		max-width:100%;
		width:auto;
		margin:0px!important;
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

	@media (min-width: 480px) {
	}
</style>