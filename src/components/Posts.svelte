<script>
    export let posts = [];
    import { goto } from '@sapper/app';
    import Image from "svelte-image";
    import { fly, slide } from 'svelte/transition'
    import { quadInOut } from 'svelte/easing';
    import { onMount,tick } from 'svelte';
    
    let sousFamille = false;
    let lavabos;
    let card, navCard;
    $: currentPosts = sousFamille ? lavabos : posts.filter(l => !l.famille || l.famille !== 'lavabo');

    onMount(async()=>{
        lavabos = posts.filter(l => l.famille && l.famille == 'lavabo');
        console.log(card.offsetHeight);
        navCard.style.height = card.offsetHeight + 'px';
    })

    async function changeFamille () {
        sousFamille = !sousFamille;
        await (tick);
        navCard.style.height = card.offsetHeight + 'px';
    }

</script>
        {#key sousFamille}
		<div class="colposts" in:fly={{easing : quadInOut, x:2000, duration:500, delay:200}} out:fly={{easing : quadInOut, x:-2000, duration:500}} >
			<div class="columns is-multiline has-background-primary-light cols-produits is-variable is-1 padding-posts"
                out:slide={{easing : quadInOut, duration:500 }}
            >
                <div class="column is-one-third is-half-touch mb-0">
					<div class="card mb-2 mt-2" on:click={changeFamille} bind:this={navCard} >
                        {#if !sousFamille}
                        <div class="card-image">
							<figure class="image">
                                <div class="card-thumb">
                                    <Image src={"/img/lavabo.svg"} alt={"Section Lavabos"} />
                                </div>
							</figure>
						</div>
						<div class="card-content">		  
							<div class="content">
								<h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">Nos Lavabos</h2>
							</div>
						</div>
						<footer class="card-footer">
							<div class="button is-success has-text-weight-bold is-uppercase">découvrir</div>
						</footer>
                        {:else}
						<div class="flexbase" style="height:100%;">
                            <img src={"/img/back.png"} alt={"Retour à la liste des produits"} class="retour" />
                            <h2 class="title is-3 has-text-primary has-text-centered has-text-weight-light" style="position:relative;top:1em;">Retour à la liste<br>des produits</h2>
						</div>
                        {/if}
					</div>
				</div>
				{#each currentPosts as post}
				<div class="column is-one-third is-half-touch mb-0">
					<div class="card mb-2 mt-2" on:click={()=> goto(`produits/${post.slug}`, {noscroll : true})} bind:this={card}>
						<div class="card-image">
							<figure class="image">
                                <div class="card-thumb">
                                    <Image src={post.thumbnail} alt={post.title} />
                                </div>
								<!-- <img src={post.thumbnail} alt="{post.title}"> -->
							</figure>
						</div>
						<div class="card-content">		  
							<div class="content">
								<h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">{@html post.title}</h2>
							</div>
						</div>
						<footer class="card-footer">
							<a href="produits/{post.slug}" class="button is-success has-text-weight-bold is-uppercase">découvrir</a>
						</footer>
					</div>
				</div>
				{/each}
			</div>
		</div>
        {/key}
<style>

    .button {
        border-radius:0px;
    }
    .padding-posts {
        padding-top:2rem;
        padding-bottom:2rem;
    }
    :global(.card-thumb), :global(.card-thumb img), :global(.flexbase .famille) {
        height : 200px!important;
        width:auto;
        min-width:100%;
        object-fit:cover;
        border-radius: 0px;
    }
    :global(.flexbase .retour) {
        max-height : 72px;
        width: auto;
        align-self: center;
    }
    .card {
        cursor: pointer;
    }

    .colposts {
        padding : 2em 2.5rem;
        background : var(--lightblue);
        transition: height 500ms ease-in-out;
    }
  
    .card-content, .card-footer {
        background: white
    }
    .card-content {
        min-height: 7.3em;
    }

    @media screen and (max-width: 1024px) {
        .content .is-4 {
            font-size:2.1em;
            line-height:1.25em;
	    }
        a.button, div.button {
            font-size:1.2em;
        }
        .card-content {
            min-height: 9.5em;
        }
        .colposts {
            padding-left:6px;
            padding-right:0px;
            padding-top:0px;
            padding-bottom:48px;
        }
    }

</style>