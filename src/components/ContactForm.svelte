
<script>
import  {Toast} from 'svelma'
import { slide } from 'svelte/transition'
import { quadInOut } from 'svelte/easing';
export let deplieForm = false;

let form = 
{
	tel : '',
	email : '',
	message : '',
	nom : '',
	prenom : '',
	checked : false
};

// Anim Slide en deux temps why ?

let formessage = {...form} ;

async function submitForm (event) {
	formessage.tel = !(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(form.tel));
	formessage.email = !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email));
	formessage.checked = form.checked === false;
	formessage.message = form.message.length < 2
	formessage.nom = form.nom.length < 2;
	formessage.prenom = form.prenom.length < 2;
	
	if (Object.values(formessage).every(item => item === false)) {
		let fo = document.getElementById('formcontact');
		let formdata = new FormData(fo);
        deplieForm = false;
		fetch("/contact/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formdata).toString()
		})
			.then(() => 
				Toast.create({message : "Votre message a bien été envoyé", background : 'has-background-primary', duration:4000})
			)
			.catch(error => Toast.create({message : "Votre message n'a pas pu être envoyé" + error, background : 'has-background-danger', duration:4000}));
		
		event.preventDefault();
		
    }
	
}

</script>

	<div class="subcontainer pb-6 pt-6 mt-6">

		<div class="columns mt-2 is-vcentered">
			<div class="column is-two-thirds has-text-left pl-6 leftmob" style="display:flex;">
				<img src="./img/sigle-min.svg" alt="Sigle EDRA-MEDICAL" width="128" class="ml-3">
				<h1 class="title has-text-primary has-text-centererd pl-5" id="besoin-infos" style="align-self:center;">
					Besoin d'informations complémentaires ?
				</h1>
			</div>
			<div class="column has-text-right pr-6">
				<button on:click={()=> deplieForm = !deplieForm } class="button is-primary is-large has-text-weight-bold mr-3" id="contact-bouton" >Contactez-nous</button>
			</div>
		</div>
    
        {#if deplieForm}

            <form class="p-6 mxform" method='POST' name='formcontact' data-netlify="true" id="formcontact" transition:slide={{easing : quadInOut}}>
                
                <input type="hidden" name="form-name" value="formcontact">
                <div class="columns mb-0 is-mobile is-multiline">
                    <div class="column is-full-touch">
                        <div class="field">
                            <div class="control has-icons-left">
                                <input bind:value={form.nom}
                                class="input is-primary" name="nom" type="text" placeholder="Votre nom">
                                
                            </div>
                            {#if formessage.nom}
                            <p class="help is-danger">Veuillez saisir votre nom</p>
                            {/if}
                        </div>
                    </div>
                    <div class="column full-touch">
                        <div class="field">
                            <div class="control has-icons-left">
                                <input bind:value={form.prenom}
                                class="input is-primary" type="text" name="prenom" placeholder="Votre prénom">
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="field nocol">
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-primary" placeholder="email"
                            type="email" bind:value={form.email} name="email" required />	
                    
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
                
                <div class="field nocol">
                    <div class="control has-icons-left has-icons-right">
                    <input class="input is-primary" name="tel" placeholder="Téléphone" bind:value={form.tel} type="tel" >
                    
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
                
                <div class="field nocol">
                    <div class="control">
                    <textarea class="textarea is-primary" placeholder="Message" name="message"
                    bind:value={form.message}></textarea>
                    </div>
                    {#if formessage.message}
                    <p class="help is-danger">Veuillez saisir un message</p>
                    {/if}
                </div>
                
                <div class="field nocol">
                    <div class="control">
                    <label class="checkbox accepts">
                        <input type="checkbox" bind:checked={form.checked} name="checked" >
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

        {/if}

	</div>

<style>
	input::placeholder, textarea::placeholder {
		color:var(--maincolor);
	}

	.subcontainer {
		padding:0% 10%;
	}

    :global(.mxform .input, .mxform .textarea:not([rows])) {
        padding-left:1em!important;
    }

    @media screen and (max-width: 1024px) {
        .leftmob {
            margin-left:-1.75em;
        }
        .subcontainer {
		    padding:0% 5%;
            margin-bottom:3em;
    	}
        .mxform {
            padding:1rem!important;
            margin-top: 3rem;
        }
        .nocol {
            margin-top: 0.75rem;
            margin-bottom: 1.5rem;
        }
        input::placeholder, textarea::placeholder, input, textarea, button {
            font-size : 2rem;
        }
        .accepts {
            font-size:1.5rem;
        }
        .checkbox input {
            width:32px;
            height:32px;
            margin-right:0.5em;
            top: 7px;
            position: relative;
        }
        #besoin-infos {
            font-size:1.8em;
            width:80%;
            text-align:center;
        }
        #contact-bouton {
            font-size:1.6em;
            padding:auto 0.5em;
        }
    }
</style>
