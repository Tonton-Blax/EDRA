<script context="module">                                                                                                                                                                                                                                                                   
	export async function preload({ params }) {
		const posts = await (await this.fetch(`produits.json`)).json();
		
		const res = await this.fetch(`produits/${params.slug}.md`);
		if (res.status === 200) {
			return { postMd: await res.text(), posts };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>
  
<script>
	import fm from 'front-matter';
	import marked from 'marked';
	import { onMount } from 'svelte';
	import Header from '../../components/Header.svelte'
	import { fly } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';
	import { observing } from '../../utils/stores.js';
	import IntersectionObserver from "svelte-intersection-observer";

	let headerEl;

	export let postMd, posts;
	
	let produit = fm(postMd).attributes;

	let Images;

	async function navigate (url) {
		const res = await fetch(url);
		if (res && res.ok) {
			const txt = await res.text();
			if (txt) {
				produit = fm(txt).attributes;
				window.location.replace(url);
			}
		}
	}

	onMount(async() => {
		const compImages = await import('svelte-images/src/Images/Images.svelte');
		Images = compImages.default;
		console.log(produit.contenu)
	});
</script>

{#key produit.title}
<div class="container" 
	in:fly="{{ y: -1000, duration: 350, delay: 250,  easing: quadInOut }}"
	out:fly="{{ y: 1000, duration: 350, easing: quadInOut }}" 
>
	<div class="columns is-gapless is-multiline">
		<div class="column is-full">
			<IntersectionObserver bind:intersecting={$observing} element={headerEl} >
				<div class="edra-block no-padding has-text-white" bind:this={headerEl}>
					<Header 
						siglePointilles={true}
						bgColor={"#D9E7EC"} linesColor={"#005476"} 
						title={{
							title : "Fiches Techniques", 
							subTitle : "Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus."
						}}
					/>
				</div>
			</IntersectionObserver>
		</div>

	
		<div class="column is-full">
			<div class="edra-block no-padding has-text-white">
				<div class="overblock">
					<h3 class="title is-3 has-text-primary has-text-weight-bold">{produit.title}</h3>
					<p class="has-text-primary has-text-left">{produit.subtitle}</p>
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
								<svelte:component this={Images} 
								numCols={contenu.images && contenu.images.length >= 4 ? 4 : contenu.images.length} 
								images={contenu.images.map(c => c = {src : c})} gutter={10} />
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
				{#if produit.tableau}
				<div class="center-block mb-6">
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
	</div>
</div>


<div class="container">

	<div class="columns has-background-primary ml-0 mr-0 mb-0">	
		<div class="column is-full centered-block">
			<h1 class="title is-1 has-text-white has-text-centered p-8">
				Découvrir le reste de la gamme
			</h1>
		</div>
	</div>

	<div class="columns is-multiline has-background-primary-light cols-produits  ml-0 mr-0">
		{#each posts as post}
		<div class="column is-one-third mt-0 mb-1 ml-1 mr-1">
			<div class="card">
				<div class="card-image">
					<figure class="image is-4by3">
						<img src="https://bulma.io/images/placeholders/1280x960.png" alt="{post.title}">
					</figure>
				</div>
				<div class="card-content">		  
					<div class="content">
						<h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">{post.title}</h2>
					</div>
				</div>
				<footer class="card-footer">
					<button on:click={() => navigate(`/produits/${post.slug}`)} class="button is-success is-uppercase">découvrir</button>
				</footer>
			</div>
		</div>
		{/each}
	</div>
</div>
{/key}
<style>
.container {
	background:white!important;
}
.subcontainer {
	padding: 0% 10%;
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
	width: 90%;
    justify-content: center;
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

</style>