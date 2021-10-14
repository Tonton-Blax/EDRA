<script>
	import Footer from '$lib/layout/Footer.svelte'
	import Nav from '$lib/layout/Nav.svelte'
	import Transition from '$lib/layout/Transition.svelte';
	import Banner from '$lib/layout/Banner.svelte'
	import '$lib/layout/cookies.css' // import optional styles
	import "../app.postcss";
	import { page } from '$app/stores';
	import { isMobileDevice } from '$lib/utils/utils.js';
	import { browser } from "$app/env";

	$: isMobile = isMobileDevice();
	
	if (browser && isMobile) {
		const edra = document.querySelector('#edra');
		edra.style.maxWidth = window.innerWidth + 'px';
	}

	$: segment = $page.params.slug ? undefined : $page.path.split(/[\/]/)[1] || '/';
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
</div>

<Footer {segment} />
</body>


<style>
	.container {
		background:white;
	}

	:global(main) {
		padding-top:32px;
	}


</style>