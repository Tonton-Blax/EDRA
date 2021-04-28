<script context="module">                                                                                                                                                                                                                                                                   
	export async function preload({ params }) {
		const res = await this.fetch(`produits.json`);
		if (res.status === 200) {
			const rawPosts = await res.json();
			const posts = rawPosts.map(r => { return {...r.contents, slug : r.slug}})
			const thisPost = posts.find(p => p.slug === params.slug)
			return { postMd: thisPost, posts };
		} else {
			this.error(res.status, res.message || "pouet");
		}
	}
</script>
  
<script>
	
	import marked from 'marked';
	import { onMount, tick } from 'svelte';
	import Posts from '../../components/Posts.svelte'	
	import ContactForm from '../../components/ContactForm.svelte'
	import { stores } from '@sapper/app';
	import {observing} from '../../utils/stores.js';
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte'
	import Modal from 'svelma/src/components/Modal/Modal.svelte'
	import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons'
	import { goto } from '@sapper/app';

	const { page } = stores();

	export let postMd, posts;
	
	let produit;
	let gal;

	$: 	$page.params.slug && resetStuff();
	$: if (active && ready && gal) 
		onpopstate = () => {
			active = false;
			goto($page.path);
			gal.scrollIntoView();
		};

	let subHeader;
	let ready;
	let active = false;
	let currentSrc;

	let resetStuff = async () => {
		if (!ready || !subHeader)
			return;
		subHeader.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
		produit = posts.find( p => p.slug == $page.params.slug);
	}

	let open = (src) => {
		currentSrc = src;
		active = true;
	}

	onMount(async() => {
		$observing = false;
		produit = postMd;
		ready = true;
		await tick();
		window.scrollTo({ behavior: "smooth", top: 0 });	
	});

</script>

<Modal bind:active={active}>
	  <img alt={currentSrc} src={currentSrc} width="100%"/>
</Modal>

{#if ready}

	<div class="column is-full mt-6" bind:this={subHeader}>
		<div class="edra-block no-padding has-text-white">
			<!-- CHAPO DESKTOP -->
			<div class="overblock flexbase">
				<h3 class="title is-3 has-text-primary has-text-weight-bold">{@html produit.title}</h3>
				<p class="has-text-primary has-text-left">{@html produit.subtitle}</p>
			</div>
			<!-- END -->
			<div class="img-container fit-header bgmm">
				{#if produit.thumbnail.length}
					<img src={produit.thumbnail} class="fit-header" alt="{produit.slug}"/>
				{/if}
			</div>
		</div>
	</div>
	<!-- CHAPO MOBILE -->
	<div class="column is-full is-hidden-desktop border-bottom-mobile">
		<div class="edra-block no-padding flexbase">
			<div class="overblock-mobile">
				<div class="flexbase">
					<h3 class="title is-inbetween-touch has-text-primary has-text-weight-bold">{@html produit.title || ""}</h3>
					<p class="has-text-primary has-text-left is-size-1">{@html produit.subtitle || ""}</p>
				</div>
				<div class="block-bouton">
					&nbsp;
				</div>
			</div>
		</div>
	</div>

	<div class="column is-full mt-6">
		<div class="subcontainer">
		
			{#each produit.contenu as contenu }
				<div class="edra-contenu" class:nothing={contenu.type == "imagesobject" && contenu.images && contenu.images.length >= 2}>
					{#if contenu.type && contenu.type == "sectionmeta"}
						<div class="edra-heading has-background-primary">
							{#if contenu.sectiontitle}
								<h2 class="title has-text-white has-text-weight-bold is-3">{contenu.sectiontitle}</h2>
							{/if}
							{#if contenu.sectionsubtitle}
								<h2 class="title has-text-white has-text-weight-normal is-55">{contenu.sectionsubtitle}</h2>
							{/if}
						</div>

					{:else if contenu.type == "imagesobject"}
						<div class="gallerie" bind:this={gal}>
							{#if contenu.images && contenu.images.length === 1}
								<div class="slide-unique">
									<img src={contenu.images[0]} alt="contenu" on:click={_ => open(contenu.images[0])} >
								</div>
							{:else}

								<Carousel perPage={contenu.images.length >= 2 ? 2 : 1} controls={true} dots={false} multipleDrag={false} 
								autoplay={3000} duration={500} draggable={false} >
									<span class="control" slot="left-control" class:invisible={active}>
										<ChevronLeftIcon />
									</span>
									{#each contenu.images as src, idx}
									<div class="slide-content-wrapper">
										<div class="slide-content">
											<img src={src} alt="contenu" on:click={_ => open(src)} style="cursor:pointer;" >
										</div>
									</div>
									{/each}
									<span class="control" slot="right-control" class:invisible={active}>
										<ChevronRightIcon />
									</span>
								</Carousel>

							{/if}
						</div>

					{:else if contenu.type && contenu.type == "intertitrebigobject"}
						<h3 class="title has-text-primary has-text-weight-normal is-4">{contenu.interbig}</h3>

					{:else if contenu.type && contenu.type == "textblock"}
						<div class="content">{@html marked(contenu.body)}</div>

					{:else if contenu.type && contenu.type == "leplusobject"}
						<p class="content has-text-primary has-text-weight-bold">
							<span class="has-text-success">Le + : </span>{@html contenu.leplus}</p>

					{/if}
				</div>
			{/each}
			{#if produit.tableau && produit.tableau[0] && produit.tableau[0].length}
			<div class="center-block mb-2">
				<table class="table is-responsive">
					<thead>
					<tr>
						{#each produit.tableau[0].split(',') as thead}
						<th>{thead.length ? thead.trim() : ""}</th>
						{/each}
					</tr>
					</thead>
					<tbody>
						{#each produit.tableau as ligne, idx}
						{#if idx >= 1}
							<tr>
								{#each ligne.split(',') as td}
									<td>{td.length ? td.trim() : ""}</td>
								{/each}
							</tr>
						{/if}
						{/each}
					</tbody>
				</table>
			</div>
			{/if}
		</div>
	</div>


	<div class="column is-full">
	<ContactForm />
	</div>

	<div class="container">

		<div class="columns has-background-primary ml-0 mr-0 mb-0">	
			<div class="column is-full centered-block">
				<h1 class="title is-1 has-text-white has-text-centered p-8">
					Découvrir le reste de la gamme
				</h1>
			</div>
		</div>
		<div style="background:var(--lightblue);width:100%">
			<Posts {posts} />
		</div>
	</div>
{/if}

<style>
.container {
	background:white!important;
}
.subcontainer {
	padding: 0% 14%;
}
.nothing {
	padding-left: 0px!important;
	padding-right: 0px!important;
	margin-left: 0px!important;
	margin-right: 0px!important;
}
.edra-contenu {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	height: auto;
	padding:1rem 2rem;
	overflow-x:hidden;
	overflow-y:auto;
}
.edra-heading {
	width: fit-content;
	padding:2.5rem;
}
.edra-heading > * {
	line-height: 1rem;
}
:global(.edra-heading strong) {
	font-weight:700;
}

:global(.edra-contenu .content ul) {
  list-style: none!important;
  padding: 0;
  margin: 0;
  margin-left:10px;
}
:global(.edra-contenu .content ul li) {
	position: relative;
    padding-left: 10px;
}
:global(.edra-contenu .content ul li::before) {
  content: " "; 
  background-color: var(--maincolor);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left:0;
  height: 10px;
  width: 10px;
}
:global(.edra-contenu .content ul li > ul > li::before) {
  content: " "; 
  background-color: transparent;
  border-radius: 50%;
  border : solid 1px var(--maincolor);
  display: inline-block;
  position: absolute;
  left:0;
  height: 10px;
  width: 10px;
}
.control :global(svg) {
		color: #fff;
		z-index:5000;
		cursor:pointer;
}

.control .invisible :global(svg) {
	display:none;
}

@media screen and (max-width: 1024px) {
	.subcontainer {
		padding: 0% 4%;
		font-size:2em;
	}
	.is-inbetween-touch {
		font-size:4.5rem;
	}
	.is-3 {
		font-size:2em;
		line-height:1em;
	}
	
	.is-4 {
		font-size:1.5em;
		line-height:1.5em;
	}
	:global(.edra-contenu p) {
		margin-top:0em;
	}
	:global(.edra-contenu .title) {
		margin-top:0em;
	}
	:global(.edra-contenu .content ul li:before) {
		margin-left: -0.5em;
    	margin-top: 0.75em;
	}
	.no-padding {
		padding:0px!important;
	}
	.fit-header {
		height: var(--mob-height);
	}
	.overblock-mobile {
      position:absolute;
      height:auto;
      padding:3.5% 12.5% 0%;
    }
	.block-in {
		margin-top:2rem;
	}
}

@media screen and (min-width: 1024px) {
	:global(.edra-contenu .content ul li:before) {
		margin-left: -10px;
  		margin-top:7px;
	}
}

</style>