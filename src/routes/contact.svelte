<svelte:head>
	<title>Contact</title>
</svelte:head>
<script>
import Header from '../components/Header.svelte'
import ContactForm from '../components/ContactForm.svelte'
import {observing} from '../utils/stores.js';
import IntersectionObserver from "svelte-intersection-observer";
import { stores } from '@sapper/app';

let headerEl;
const { page } = stores();

let ok = true;
$: $page.path && notOk();
function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
let notOk = async () => {ok = false; await timeout(100); ok = true;}
	
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
