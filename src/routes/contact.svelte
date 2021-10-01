<svelte:head>
	<title>Contact</title>
</svelte:head>
<script>

import ContactForm from '$lib/layout/ContactForm.svelte'
import { observing } from '$lib/utils/stores.js';
import { onMount } from 'svelte'

onMount(async()=>{
	$observing = false;
})

</script>

	<div class="column is-full">
		<ContactForm deplieForm={true} />	
	</div>
