<script context="module">

	export async function load({ fetch, page }) {
		const {query} = page;
		const res = await fetch(`/produits.json`);
		if (res.status === 200) {
			return {
				props: {
					posts: await res.json(),
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
	import Footer from '$lib/layout/Footer.svelte'
	import Nav from '$lib/layout/Nav.svelte'
	import Transition from '$lib/layout/Transition.svelte';
	import Banner from '$lib/layout/Banner.svelte'
	import '$lib/layout/cookies.css' // import optional styles
	import "../app.postcss";
	import { navigating, page } from '$app/stores';
	import { isMobileDevice } from '$lib/utils/utils.js';
	import { browser } from "$app/env";
	import Posts from '$lib/layout/Posts.svelte'
	import lazyload from 'vanilla-lazyload';
	export let posts;

	let lazyloadInstance;
	
	if (browser)
		lazyloadInstance = new lazyload();
	
	posts.sort( (a, b)  => (a.ordre || 1) - (b.ordre || 0) )

	$: currentLevel = $page.query && $page.query.get('level') || 0;
	$: isMobile = isMobileDevice();
	$: segment = $page.params.slug ? $page.params.slug : $page.path.split(/[\/]/)[1] || '/';
	
	$: if (($page.params || $page.query || $navigating) && lazyloadInstance) {
		setTimeout(()=>lazyloadInstance.update(),100);
		setTimeout(()=> !isMobile ? window.scroll(0,0) : document.body.scrollTop = 0, 200);
	}
	
	if (browser && isMobile) {
		const edra = document.querySelector('#edra');
		edra.style.maxWidth = window.innerWidth + 'px';
	}

	let initAnalytics = () => {}
	
</script>

<Banner cookieName="foo"
	heading="EDRA respecte vos données : "
	acceptLabel="Accepter"
	settingsLabel="Paramètres des cookies"
	closeLabel="Fermer"
	description="Nous utilisons des cookies, afin d'améliorer la performance de votre navigation, et mesurer l'audience du site. Vous pouvez, à tout moment, désactiver ces cookies"
	choices = {{
		analytics : {
			label : "Cookies d'analyse statistique",
			description : "Utilisé par google Analytics afin de mesurer l'audience de notre site"
		},
		necessary : {
			label : "Cookies requis",
			description : "Cookie pour contrôle des autres cookies, ne peut être désactivé"
		},
		tracking : false,
		marketing : false
	}}
	
	on:analytics={initAnalytics} />

<Nav {segment} />

<body>
	<div class="container">
		<Transition>
			<div class="columns is-gapless is-multiline">
					<slot></slot>
			</div>
		</Transition>

	{#if segment!=='concept' && segment!=='contact' && segment!=='mentions'}
		{#if $page.params.slug}
			<div class="columns has-background-primary ml-0 mr-0 mb-0">	
				<div class="column is-full centered-block">
					<h1 class="title is-1 has-text-white has-text-centered p-8">
						Découvrir le reste de la gamme
					</h1>
				</div>
			</div>
		{:else if segment === 'produits'}

			<div class="spacer" />
		{/if}
			<div style="background:var(--lightblue);width:100%;">
				<Posts {posts} {currentLevel} on:updatelazy={()=>lazyloadInstance.update()} />
			</div>
	{/if}

<Footer {segment} />
</body>


<style>
	.container {
		background:white;
	}

	:global(main) {
		padding-top:32px;
	}
	.spacer {
		padding:1.45em 1.5rem;
		background:var(--lightblue);
	}
	
</style>