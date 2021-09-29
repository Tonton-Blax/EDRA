<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'
	import Transition from '../components/Transition.svelte';
	import GdprBanner from '@beyonk/gdpr-cookie-consent-banner'
	import '../styles/cookies.css' // import optional styles
	export let segment;

	let initAnalytics = () => {}

</script>
<GdprBanner cookieName="foo"
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
	<Transition refresh={segment}>
	<div class="columns is-gapless is-multiline">
			<slot />
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