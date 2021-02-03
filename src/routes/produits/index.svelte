<script context="module" lang="ts">
	export function preload() {
		return this.fetch(`produits.json`).then((r: { json: () => any; }) => r.json()).then((posts: { slug: string; title: string, html: any }[]) => {
			return { posts };
		});
	}
</script>

<script lang="ts">
	export let posts: { slug: string; title: string, html: any }[];
</script>

<svelte:head>
	<title>Produits EDRA Médical</title>
</svelte:head>
		<div class="container">
			<div class="columns is-multiline is-gapless p-6 has-background-primary-light cols-produits">
				{#each posts as post}
				<div class="column is-one-third">
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
							<a rel="prefetch" href="produits/{post.slug}" class="button is-success is-uppercase">découvrir</a>
						</footer>
					</div>
				</div>
				{/each}
			</div>
		</div>

<style>
	.card-footer {
		border-top: unset;
		justify-content: flex-end;
		padding-bottom:1.5em;
		padding-right:1.5em;
	}
	.card {
		margin : 30px 15px;
		border-radius: 0px;
	}
	.card-content {
		padding-bottom:0.5em;
	}
	.cols-produits {
		padding: 25px 25px;
	}
	.button {
		border-radius:0px;
	}
</style>
