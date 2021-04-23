<svelte:head>
	<title>Contact</title>
</svelte:head>
<script>

import ContactForm from '../components/ContactForm.svelte'
import { observing } from '../utils/stores.js';
import { onMount } from 'svelte'

onMount(async()=>{
	$observing = false;
})


</script>

		<div class="column is-full">
			<ContactForm deplieForm={true} />	
		</div>
