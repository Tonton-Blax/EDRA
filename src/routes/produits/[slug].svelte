<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	 export const prerender = true;
	 export async function load({ fetch, page }) {
		const { slug } = page.params;
		const url = `/produits/${ slug }`;
		const res = await fetch(`${ url }.json`);
		if (res.ok) {
			const stuff = await res.json();
			return {
				props: { produit: stuff.post, posts : stuff.posts }
			};
		}
		if (res.status == 404) {
			return {
				status: res.status,
				error: new Error('This page does not exist')
			}
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${ url }`)
		};
	}
</script>

<script>

import marked from 'marked';
import { onMount, tick, onDestroy } from 'svelte';
import Posts from '$lib/layout/Posts.svelte'	
import ContactForm from '$lib/layout/ContactForm.svelte'
import {observing} from '$lib/utils/stores.js';
import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte'
import Modal from '$lib/layout/Modal.svelte'
import ChevronLeftIcon from '$lib/layout/ChevronLeftIcon.svelte'
import ChevronRightIcon from '$lib/layout/ChevronRightIcon.svelte'
import { isMobileDevice, getFileName } from '$lib/utils/utils.js';
import lazyload from 'vanilla-lazyload';
import { browser } from '$app/env';
import SvelteSeo from "svelte-seo";
import { page } from '$app/stores';

export let produit, posts;
posts.sort( (a, b)  => (a.ordre || 1) - (b.ordre || 0) )

let lazyloadInstance;

$: isMobile = isMobileDevice();
$: $page.paramas, lazyloadInstance && setTimeout(()=>lazyloadInstance.update(),100);

if (browser) {
	lazyloadInstance = new lazyload();
	window.onbeforeunload = ()=> {refresh=true; return undefined};
}


let gal;
let subHeader;
let active = false;
let currentSrc;
let chapoImage;

let open = (src) => {
	currentSrc = src;
	active = true;
}

onDestroy(()=>lazyloadInstance && lazyloadInstance.destroy());

onMount(async() => {
	$observing = false;

	if (isMobile && produit && produit.decalage)
		chapoImage.style.bottom = `${produit.decalage}%`
	//window.scrollTo({ behavior: "smooth", top: 0 });
});

</script>

<Modal bind:active={active}>
	  <img alt={currentSrc} src={currentSrc} width="100%"/>
</Modal>

<SvelteSeo
    title={produit.title || "Edra médical"}
    description={produit.description || produit.subtitle || produit.famille || produit.slug || "Paillasses endoscopiques, Lavabos, Auges, Bloc"}
    nofollow={false}
    noindex={false}
	keywords={produit.keywords || "Mobilier médical français sur-mesure"}
    canonical={ browser ? window.location.href : ""}
    
	openGraph={{
        title: `EDRA Médical : ${produit.title}`,
        description: produit.description || produit.subtitle || "Paillasses endoscopiques, Lavabos, Auges, Bloc",
        url: browser ? window.location.href : "",
        type: 'website',
        images: [
        {
            url: `${browser ? window.location.host : ""}/${produit.thumbnail.replace('..','')}`,
            //width: 405,
            //height: 70,
            alt: produit.description || produit.subtitle
        }
        ]
    }}
/>
	<div class="column is-full mt-6" bind:this={subHeader} id="#headerpost">
		<div class="edra-block no-padding has-text-white">
			<!-- CHAPO DESKTOP -->
			<div class="overblock flexbase">
				<h3 class="title is-3 has-text-primary has-text-weight-bold">{@html produit.title}</h3>
				<p class="has-text-primary has-text-left">{@html produit.subtitle}</p>
			</div>
			<!-- END -->
			<div class="img-container fit-header bgmm">
				{#if produit.thumbnail.length}
					<img data-src={produit.thumbnail} width="1343" height="672" src="/img/lowres/{getFileName(produit.thumbnail)}__400.webp" class="lazy fit-header" alt="{produit.slug}" bind:this={chapoImage} />
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
									<img data-src={contenu.images[0]} src="/img/lowres/{getFileName(contenu.images[0])}__400.webp" alt="contenu" on:click={_ => open(contenu.images[0])} class="lazy" >
								</div>
							{:else}

								<Carousel perPage={contenu.images.length >= 2 ? 2 : 1} controls={true} dots={false} multipleDrag={false} 
								autoplay={3000} duration={500} draggable={false} >
									<span class="control" slot="left-control" class:invisible={active}>
										<ChevronLeftIcon color={"#005476"} show={contenu.images && contenu.images.length > 2} />
									</span>
									{#each contenu.images as src, idx}
									<div class="slide-content-wrapper">
										<div class="slide-content">
											<img data-src={src} src="/img/lowres/{getFileName(src)}__400.webp" alt="contenu" on:click={_ => open(src)} style="cursor:pointer;" class="lazy" >
										</div>
									</div>
									{/each}
									<span class="control" slot="right-control" class:invisible={active}>
										<ChevronRightIcon color={"#005476"} show={contenu.images && contenu.images.length > 2} />
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
			<Posts {posts} currentLevel={!produit.famille || produit.famille == 'normal' ? '0' : '1'} />
		</div>
	</div>
<style>

.fit-header {
	position:relative;
}

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
	margin-top: -0.75rem;
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
}

@media screen and (min-width: 1024px) {
	:global(.edra-contenu .content ul li:before) {
		margin-left: -10px;
  		margin-top:7px;
	}
}

</style>