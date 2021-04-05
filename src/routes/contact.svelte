<svelte:head>
	<title>Contact</title>
</svelte:head>
<script>
import Header from '$lib/components/Header.svelte'
import ContactForm from '$lib/components/ContactForm.svelte'
import {observing} from '$lib/stores.js';
import IntersectionObserver from "svelte-intersection-observer";
import { page } from '$app/stores';
import { onMount } from 'svelte'

let ready = false;
let headerEl;

$: $page.path && (ready = false) && setTimeout(()=>ready = true, 100)

onMount(async() => ready = true);

</script>

<div class="container has-background-white">
	
	<div class="columns is-gapless is-multiline	mb-6 pb-6">
		<div class="column is-full">
			{#if ready}
			<IntersectionObserver bind:intersecting={$observing} element={headerEl}>
				<div class="edra-block no-padding has-text-white" bind:this={headerEl}>
					<Header/>
				</div>
			</IntersectionObserver>
			{/if}
		</div>
	</div>
	<ContactForm deplieForm={true} />
</div>
