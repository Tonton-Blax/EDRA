<svelte:head>
	<title>Contact</title>
</svelte:head>
<script>
import Header from '$lib/components/Header.svelte'
import ContactForm from '$lib/components/ContactForm.svelte'
import {observing} from '$lib/stores.js';
import IntersectionObserver from "svelte-intersection-observer";
import { page } from '$app/stores';

$: $page.path && notOk();
let ok = true;
function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let notOk = async () => {ok = false; await timeout(100); ok = true;}

let headerEl;


</script>

<div class="container has-background-white">
	
	<div class="columns is-gapless is-multiline	mb-6 pb-6">
		<div class="column is-full">
			{#if ok}
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
