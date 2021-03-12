<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
	//import Carousel from 'svelte-carousel/src/components/Carousel/Carousel.svelte'
	import {onMount} from 'svelte'
	import Header from '../components/Header.svelte'
	import 'svelte-carousel/dist/index.css'
	import {chunk, shuffleArray} from '../utils/utils.js';
	import Saos from "saos";

	let imagesKerrock = [
			'../img/kerrock02.jpg',
			'../img/bur.jpeg',
			'../img/pereno.jpeg'
	];
	let imagesEquipe = [
			'../img/equipe1.png',
			'../img/ambu.jpeg'
	];
	let imagesPaillasses = [
		'../img/paillasse_endoscopique.jpg',
		'../img/pp.jpeg'
	]
	let imagesLogos= [
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

	let Carousel
	onMount(async() => {
		const comp = await import('svelte-carousel/src/components/Carousel/Carousel.svelte');
		Carousel = comp.default;
	});

</script>

<div class="container">
	<div class="columns is-gapless is-multiline">
		<div class="column is-full">
			<!--
			<div class="edra-block no-padding has-text-white">
				<div class="img-container image">
						<img src="../img/bloctop.jpg" class="autoheight" alt="nature" />
				</div>			
			</div>
			-->
			<Saos>
			<div class="edra-block no-padding has-text-white">
				<Header />
			</div>
			</Saos>
		</div>
	
		<div class="column is-full">
			<div class="edra-block no-padding has-text-white">
				<div class="overblock">
					<div class="block-up">>
						<h3 class="title is-3 has-text-primary has-text-weight-bold">Paillasses endoscopiques</h3>
					</div>
					<div class="block-in">
						<p class="has-text-primary has-text-left">Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin fusce varius.</p>
						<span class="button is-success" style="float:right;">Découvrir</span>
					</div>
				</div>
				<svelte:component this={Carousel} let:loaded arrows={false} dots={true} autoplay={true} autoplayDuration={6000}>
					
					{#each imagesPaillasses as src, imageIndex (src)}
						<div class="img-container image">
						{#if loaded.includes(imageIndex)}
							<img {src} class="autoheight" alt="nature" />
						{/if}
						</div>
					{/each}
				</svelte:component>
			</div>
		</div>
		<div class="column is-full">
			<div class="edra-block no-padding has-background-white has-text-primary">
				<h2 class="title is-2 has-text-centered has-text-primary has-text-weight-bold">EDRA, 30 ans <br>de qualité de Service</h2>
				<div class="columns cols-picto">
					<Saos animation={"slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both"}>
						<div class="column is-one-fourth has-text-centered col-picto">
							<img src="../img/pictos/picto_tracking.png" alt="Fabrication à partir d'un moule">
							<h3 class="title is-4 has-text-primary">Module de traçabilité</h3>
							<p>Busce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus vitae ligula. Nulla sollicitudin. </p>
						</div>
					</Saos>
					<Saos animation={"slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.4s both"}>
					<div class="column is-one-fourth has-text-centered col-picto">
						<img src="../img/pictos/picto_madeinfrance.png" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 has-text-primary">Fabrication française</h3>
						<p>Ullamcorper nibh, in tempus sapien eros vitae ligula. Nulla sollicitudin. Fusce varius, ligula non tempu.</p>
					</div>
					</Saos>
					<Saos animation={"slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.6s both"}>
					<div class="column is-one-fourth has-text-centered col-picto">
						<img src="../img/pictos/picto_livraison.png" alt="Fabrication à partir d'un moule">
						<h3 class="title is-4 has-text-primary">Intervention dans toute la france</h3>
						<p>Tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Nulla sollicitudin. Fusce varius.</p>
					</div>
					</Saos>
				</div>
			</div>
		</div>
		<div class="column is-half">
			<div class="edra-block has-background-primary has-text-white">
				<h2 class="title is-2 has-text-white mb-0">Kerrock®</h2>
				<p class="is-size-6 has-text-left">Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet.</p>
			</div>
		</div>
		<div class="column is-half">
			<div class="edra-block no-padding has-background-white has-text-primary">
				<svelte:component this={Carousel} let:loaded arrows={false} dots={true} autoplay={true} autoplayDuration={5000} >
					{#each imagesKerrock as src, imageIndex (src)}
						<div class="img-container image">
						{#if loaded.includes(imageIndex)}
							<img {src} class="autoheight" alt="nature" />
						{/if}
						</div>
					{/each}
				</svelte:component>
			</div>
		</div>
		<div class="column is-full">
			<div class="edra-block no-padding has-text-white">
				<div class="overtop"><img src="../img/svg/hexagone.svg" alt="hexagone" style="width: 214px!important;"></div>
				<div class="overtop"><p class="has-text-left is-size-1 has-text-weight-bold" style="padding-left:150px;line-height:3.3rem;">Savoir-faire<br> et technicité</p></div>
				<svelte:component this={Carousel} let:loaded arrows={false} dots={true} autoplay={true} autoplayDuration={6000} >
					{#each imagesEquipe as src, imageIndex (src)}
						<div class="img-container image">
						{#if loaded.includes(imageIndex)}
							<img {src} class="autoheight" alt="nature" />
						{/if}
						</div>
					{/each}
				</svelte:component>
			</div>
		</div>
		<div class="column is-half">
			<div class="edra-block has-background-primary has-text-white">
				<h2 class="title is-2 has-text-white has-text-centered mb-0">Ils nous font<br>confiance</h2>
			</div>
		</div>
		<div class="column is-half">
			<div class="edra-block no-padding has-background-white has-text-primary" style="margin-left:1px;">
				<!-- <img class="autoheight" src="../img/kerrock02.jpg" alt="Hall d'accueil avec revêtement en kerrock"> -->
				<svelte:component this={Carousel} arrows={false} dots={false} autoplay={true} autoplayDuration={5000}>
					{#each chunk(shuffleArray(imagesLogos), 3) as logos, chunkIndex (chunkIndex)}
					  <div style="display: flex;">
						{#each logos as logo (logo)}
						<span class="logosquare"><img class="resize is-square" src={logo} alt="logo-"/></span>
						{/each}
					  </div>
					{/each}
				</svelte:component>
				<svelte:component this={Carousel} arrows={false} dots={false} autoplay={true} autoplayDuration={5000}>
					{#each chunk(shuffleArray(imagesLogos), 3) as logos, chunkIndex (chunkIndex)}
					  <div style="display: flex;">
						{#each logos as logo (logo)}
						<span class="logosquare"><img class="resize is-square" src={logo} alt="logo-"/></span>
						{/each}
					  </div>
					{/each}
				</svelte:component>
				<svelte:component this={Carousel} arrows={false} dots={false} autoplay={true} autoplayDuration={5000}>
					{#each chunk(shuffleArray(imagesLogos), 3) as logos, chunkIndex (chunkIndex)}
					  <div style="display: flex;">
						{#each logos as logo (logo)}
						<span class="logosquare"><img class="resize is-square" src={logo} alt="logo-"/></span>
						{/each}
					  </div>
					{/each}
				</svelte:component>
			</div>
		</div>
	</div>
</div>

<style>
	:global(:root) {
		--maincolor : #005476;
	}
	
	.logosquare {
		border: 1px solid #efefef;
		margin:0px;
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
		padding:5% 10%;
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

	p {
		margin: 1em auto;
	}
	:global(.button) {
		text-transform: uppercase;
		border-radius:0px!important;
	}
	:global(.container) {
		background:white;
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