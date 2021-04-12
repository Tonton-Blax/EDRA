<script context="module">
	export async function preload() {
		const res = await (await this.fetch(`produits.json`)).json();
		const posts = res.map(r => { return {...r.contents, slug : r.slug}})
		return { posts }
	}
</script>

<script>
	import Posts from '../../components/Posts.svelte'
	export let posts;
</script>

<svelte:head>
	<title>Produits EDRA Médical</title>
</svelte:head>


<div class="spacer" />
<Posts {posts} />


<style>
	.spacer {
		padding:1.5em 1.5rem;
		background:var(--lightblue);
	}
</style>
