<svelte:head>
	<title>Mentions légales</title>
</svelte:head>

<script context="module">

	export async function load({ fetch }) {
		const res = await fetch(`/mentions.json`);
		if (res.status === 200) {
			return {
				props: {
					mentions: await res.json(),
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

import { observing } from '$lib/utils/stores.js';
import marked from 'marked';
import { onMount } from 'svelte'
export let mentions;

onMount(async()=>{
	$observing = false;
})

</script>

    <div style="height:100px;"/>
	<div class="column is-full p-6 mt-6">
		<div class="content" >
            {@html marked(mentions.contenu)}
        </div>
	</div>

<style>
    .content {
        padding:10%;
    }
	@media screen and (max-width : 1024px)  {
		.content {
			font-size:xx-large;
		}
	}
</style>
