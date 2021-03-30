<svelte:head>
	<title>Contact</title>
</svelte:head>
<script>
import Header from '../components/Header.svelte'
import ContactForm from '../components/ContactForm.svelte'
import {observing} from '../utils/stores.js';
import IntersectionObserver from "svelte-intersection-observer";

let headerEl;


</script>

<div class="container has-background-white">
	
	<div class="columns is-gapless is-multiline	">
		<div class="column is-full">
			<IntersectionObserver bind:intersecting={$observing} element={headerEl}>
				<div class="edra-block no-padding has-text-white" bind:this={headerEl}>
					<Header/>
				</div>
			</IntersectionObserver>
		</div>
	</div>
	<ContactForm deplieForm={true} />
</div>
