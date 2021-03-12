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
	export let postMd, posts;
	import { onMount } from 'svelte';
	import {chunk} from '../../utils/utils.js';
	let produit = fm(postMd).attributes;

	let Carousel;
	onMount(async() => {
		const comp = await import('svelte-carousel/src/components/Carousel/Carousel.svelte');
		Carousel = comp.default;
	});
</script>

<div class="container">
	<div class="columns is-gapless is-multiline">
		<div class="column is-full">
			
			<div class="edra-block no-padding has-text-white">
				<div class="img-container image">
						<img src="../img/bloctop.jpg" class="autoheight" alt="nature" />
				</div>			
			</div>
				
			<div class="edra-block no-padding has-text-white">
				<div class="overblock">
					<h3 class="title is-3 has-text-primary has-text-weight-bold">{produit.title}</h3>
					<p class="has-text-primary has-text-left">{produit.subtitle}</p>
				</div>
				<div class="img-container image">
					{#if produit.thumbnail.length}
						<img src={produit.thumbnail} class="autoheight" alt="{produit.slug}" />
					{/if}
				</div>
			</div>
			
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
					<div class="content-image">
						<svelte:component this={Carousel} arrows={false} dots={false} autoplay={contenu.images.length > 2} autoplayDuration={5000}>
							{#each chunk(contenu.images, 3) as imgs, chunkIndex (chunkIndex)}
							  <div style="display: flex;">
								{#each imgs as img (img)}
								<span class="logosquare"><img class="resize is-square" src={img} alt="illustration produit EDRA"/></span>
								{/each}
							  </div>
							{/each}
						</svelte:component>
					</div>
					{:else if contenu.type && contenu.type == "intertitrebigobject"}
						<h3 class="title has-text-primary has-text-weight-normal is-4">{contenu.interbig}</h3>
					{:else if contenu.type && contenu.type == "textblock"}
						<div class="content">{@html marked(contenu.body)}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
<div class="container">
	<div class="columns is-multiline is-gapless p-0 has-background-primary-light cols-produits">
		
		{#each posts as post}
		<div class="column is-one-third p-0 m-0">
			<div class="card p-0 m-0">
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
					<a rel="prefetch" href="produits/{post.slug}" class="button is-success is-uppercase">découvrir</a>
				</footer>
			</div>
		</div>
		{/each}
	</div>
</div>


<style>

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
.content-image {
	max-height:300px!important;
	width:auto;
	overflow-y:hidden;
}
</style>