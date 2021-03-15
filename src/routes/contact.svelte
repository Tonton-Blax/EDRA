<svelte:head>
	<title>About</title>
</svelte:head>
<script>
import  {Toast} from 'svelma'
import Header from '../components/Header.svelte'
import Saos from "saos";

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
};
let form = {
	tel : '',
	email : '',
	message : '',
	nom : '',
	prenom : '',
	checked : false
}
let formessage = {...form};

async function submitForm (event) {
	formessage.tel = !(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(form.tel));
	formessage.email = !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email));
	formessage.checked = form.checked === false;
	formessage.message = form.message.length < 2
	formessage.nom = form.nom.length < 2;
	formessage.prenom = form.prenom.length < 2;
	
	if (Object.values(formessage).every(item => item === false)) {
		let myForm = document.getElementById('formcontact');
		let formData = new FormData(myForm)
		fetch('/', {
			method: 'POST',
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData).toString()
		}).then(() => 
			Toast.create({message : "Votre message a bien été envoyé", background : 'has-background-primary', duration:4000})
		)
		.catch((error) =>
			Toast.create({message : "Votre message n'a pas pu être envoyé" + error, background : 'has-background-danger', duration:4000})
		)
		/*
		let formdata = new FormData();
		//formdata.append('data-netlify', 'true')
		formdata.append('nom',`${form.nom}`);
		formdata.append('prenom',`${form.prenom}`);
		formdata.append('message',`${form.message}`);
		formdata.append('email',`${form.email}`);
		formdata.append('telephone',`${form.tel}`);
		
		fetch("/contact/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: formdata
		})
			.then(() => 
				Toast.create({message : "Votre message a bien été envoyé", background : 'has-background-primary', duration:4000})
			)
			.catch(error => Toast.create({message : "Votre message n'a pas pu être envoyé" + error, background : 'has-background-danger', duration:4000}));
		
		event.preventDefault();
		*/
    }
	
}

</script>

<div class="container has-background-white">
	<div class="columns is-gapless is-multiline	">
		<div class="column is-full">
			<Saos>
				<div class="edra-block no-padding has-text-white">
					<Header/>
				</div>
			</Saos>
		</div>
	</div>
	<div class="columns is-gapless mt-6 pt-6 is-vcentered">
		<div class="column is-full has-text-centered"
			style="display:flex;place-content:center;">
			<p class="p-6 is-size-4 has-text-weight-bold has-text-primary" style="width:64%">
				Marquage CE dispositif médical classe IIb
				conforme à la circulaire DGS/DH № 591 du 17 décembre 2003 
				EDRA MEDICAL est certifiée ISO 9001 et ISO 13485
				(dispositif médical)
			</p>		
		</div>
	</div>
	<div class="columns is-gapless is-multiline mt-2 is-vcentered">
		<div class="column is-one-fifth has-text-centered">
			<img src="./img/sigle-min.svg" alt="Sigle EDRA-MEDICAL" width="64">
		</div>
		<div class="column is-two-fifths">
			<h1 class="title is-3 has-text-primary has-text-centererd">
				Besoin d'informations complémentaires ?
			</h1>
		</div>
		<div class="column is two-fifths has-text-centered">
			<button class="button is-primary is-large has-text-weight-bold">Contactez-nous</button>
		</div>
	</div>


	<form class="p-6" method='POST' name='contact' data-netlify="true" id="formcontact">
		<div class="columns">
			<div class="column">
				<div class="field">
					<div class="control has-icons-left">
						<input bind:value={form.nom}
						class="input is-primary" name="nom" type="text" placeholder="Votre nom">
						<span class="icon is-small is-left">
							<i class="fas fa-user"></i>
						</span>
					</div>
					{#if formessage.nom}
					<p class="help is-danger">Veuillez saisir votre nom</p>
					{/if}
				</div>
			</div>
			<div class="column">
				<div class="field">
					<div class="control has-icons-left">
						<input bind:value={form.prenom}
						class="input is-primary" type="text" name="prenom" placeholder="Votre prénom">
						<span class="icon is-small is-left">
							<i class="fas fa-user"></i>
						</span>
					</div>
				</div>
			</div>
		</div>
		  
		<div class="field">
			<div class="control has-icons-left has-icons-right">
				<input class="input is-primary" type="email" bind:value={form.email} name="email" required />	
				<span class="icon is-small is-left">
					<i class="fas fa-envelope"></i>
			  	</span>
			{#if formessage.email}
			  <span class="icon is-small is-right">
				<i class="fas fa-exclamation-triangle"></i>
			  </span>
			{/if}
			</div>
			{#if formessage.email}
			<p class="help is-danger">e-mail nonvalide</p>
			{/if}
		</div>
		  
		<div class="field">
			<div class="control has-icons-left has-icons-right">
			  <input class="input is-primary" name="tel" placeholder="Téléphone" bind:value={form.tel} type="tel" >
			  <span class="icon is-small is-left">
				<i class="fas fa-phone"></i>
			  </span>
			  {#if formessage.tel}
			  <span class="icon is-small is-right">
				<i class="fas fa-exclamation-triangle"></i>
			  </span>
			  {/if}
			</div>
			{#if formessage.tel}
			<p class="help is-danger">N° non valide</p>
			{/if}
		</div>
		  
		<div class="field">
			<div class="control">
			  <textarea class="textarea is-primary" placeholder="Message" name="message"
			  bind:value={form.message}></textarea>
			</div>
			{#if formessage.message}
			<p class="help is-danger">Veuillez saisir un message</p>
			{/if}
		</div>
		  
		<div class="field">
			<div class="control">
			  <label class="checkbox">
				<input type="checkbox" bind:checked={form.checked} name="checked">
				J'accepte d'être recontacté par EDRA (requis)
			  </label>
			</div>
			{#if formessage.checked}
			<p class="help is-danger">Veuillez cocher la case</p>
			{/if}
		</div>
		  
		<div class="field is-grouped">
			<div class="control">
				<button on:click|preventDefault={submitForm}
				type="submit" form="formcontact" class="button is-primary">Envoyer</button>
			</div>
		</div>
	</form>

</div>