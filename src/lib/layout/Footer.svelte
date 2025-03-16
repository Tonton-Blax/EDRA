<script>
	export let segment;
</script>

<div class="container">
	<div
		class="columns is-gapless is-multiline"
		class:has-background-primary={segment !== "concept"}
		class:has-background-info={segment === "concept"}
	>
		<div class="column is-half">
			<div class="edra-footer has-text-white">
				{#if segment === "concept"}
					<a
						class="is-size-2 is-size-3-touch"
						style="align-self:flex-start; overflow-x:visible; width:max-content;"
						href="/contact">CONTACTEZ-NOUS</a
					><br />
				{/if}
				<p class="is-size-6" style="align-self:flex-start   ">
					© EDRA 2021<br />
					<a href="/mentions">Mentions légales RGPD</a>
				</p>
				<h2
					class="title is-5 mt-5 mb-0 has-text-weight-bold has-text-white"
					style="text-wrap-mode: nowrap;"
				>
					<a
						target="_blank"
						href="https://www.openstreetmap.org/search?query=8+all%C3%A9e+des+Fr%C3%A8res+Montgolfier+77183+Croissy-Beaubourg#map=19/48.816030/2.635060"
						>Siège social et Usine de fabrication</a
					>
				</h2>
				<p>
					8 allée des Frères Montgolfier<br />
					77183 Croissy-Beaubourg
				</p>
				<h3 class="is-size-6 mt-5" style="align-self:flex-start   ">
					© EDRA {new Date().getFullYear()}<br />
				</h3>
				<h3 style="text-wrap-mode: nowrap">
					Réalisation : <a href="https://redval.fr">redval</a>
				</h3>
			</div>
		</div>
		<div class="column is-half">
			<div class="edra-footer has-text-white">
				<a href="/" class="logo-wrapper"
					><img class="logo" alt="logo" src="../img/logo.png" /></a
				>
			</div>
		</div>
	</div>
</div>

<style>
	.edra-footer {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		height: 336px;
		max-height: 336px;
		padding: 10% 30%;
		overflow: hidden;
	}
	@media screen and (max-width: 1024px) {
		.container {
			padding-bottom: 0px;
		}
		.logo-wrapper {
			align-self: center;
		}
	}
	@media screen and (min-width: 1024px) {
		.logo-wrapper {
			align-self: flex-end;
		}
	}
	a {
		color: white;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
