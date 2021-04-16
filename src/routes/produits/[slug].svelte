<script context="module">                                                                                                                                                                                                                                                                   
	export async function preload({ params }) {
		//JSON.stringify( YAML.parseAllDocuments(content)[0] )
		//await fetch ('${slug}.md`).text())
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
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte'
	import Modal from 'svelma/src/components/Modal/Modal.svelte'

	const { page } = stores();

	export let postMd, posts;
	
	let produit;

	$: 	$page.params.slug && resetStuff();

	let subHeader;
	let ready;
	let active = false;
	let currentSrc;

	let resetStuff = async () => {
		if (!ready)
			return;
		subHeader.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
		produit = posts.find( p => p.slug == $page.params.slug);
	}

	let open = (src) => {
		currentSrc = src;
		active = true;
	}

	onMount(async() => {
		produit = postMd;
		ready = true;
		await tick();
		subHeader.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	});

</script>

<Modal bind:active={active}>
	  <img alt={currentSrc} src={currentSrc} width="100%"/>
</Modal>

{#if ready}

	<div class="column is-full mt-6" bind:this={subHeader}>
		<div class="edra-block no-padding has-text-white">
			<div class="overblock flexbase">
				<h3 class="title is-3 has-text-primary has-text-weight-bold">{@html produit.title}</h3>
				<p class="has-text-primary has-text-left">{@html produit.subtitle}</p>
			</div>
			<div class="img-container fit-header">
				{#if produit.thumbnail.length}
					<img src={produit.thumbnail} class="fit-header" alt="{produit.slug}"/>
				{/if}
			</div>
		</div>
	</div>
	<div class="column is-full mt-6">
		<div class="subcontainer">
		
			{#each produit.contenu as contenu, index}
				<div class="edra-contenu">
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
						<div class="gallerie">
							{#if contenu.images && contenu.images.length === 1}
								<div class="slide-unique">
									<img src={contenu.images[0]} alt="contenu" on:click={_ => open(contenu.images[0])} >
								</div>
							{:else}
								<Carousel perPage={contenu.images.length >= 2 ? 2 : 1} controls={false} dots={false} multipleDrag={false}>
									{#each contenu.images as src}
									<div class="slide-content">
										<img src={src} alt="contenu" on:dblclick={_ => open(src)} >
									</div>
									{/each}
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
		
		<Posts {posts} />
	</div>
{/if}
<style>
.container {
	background:white!important;
}
.subcontainer {
	padding: 0% 14%;
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
.gallerie {
	width: 100%;
    display: flex;
    align-items: center;
    place-self: center;
}
:global(.gallerie img) {
    place-self: center;
	max-height:300px;
	object-fit:contain;
}
.edra-heading > * {
	line-height: 1rem;
}
:global(.edra-heading strong) {
	font-weight:700;
}
.is-55 {
	font-size:1.1rem;
}
:global(.edra-contenu ul) {
  list-style: none!important;
  padding: 0;
  margin: 0;
  margin-left:10px;
}
:global(.edra-contenu ul li) {
	position: relative;
    padding-left: 10px;
}
:global(.edra-contenu ul li::before) {
  content: " "; 
  background-color: var(--maincolor);
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left:0;
  height: 10px;
  width: 10px;
  margin-left: -10px;
  margin-top:7px;
}
.slide-unique {
	width:100%;
}
.slide-unique img {
	object-fit: cover;
    width: 100%;
}

</style>