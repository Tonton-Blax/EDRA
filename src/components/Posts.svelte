<script>
    export let posts = [];
    import { goto } from '@sapper/app';
    import Image from "svelte-image";
    import { fly, slide } from 'svelte/transition'
    import { quadInOut } from 'svelte/easing';
    import { onMount,tick } from 'svelte';
    
    let currentLevel = 0;
    let card, navCard;
    let currentPosts = []

    onMount(async()=>{
        currentPosts = posts.filter(l => !l.famille || l.famille === 'normal');
        if (navCard && navCard.style && navCard.style.height)
            navCard.style.height = card.offsetHeight + 'px';
    })

    async function changeLevel (level, filtre) {
        if (filtre) {
            currentPosts = posts.filter(l => l.famille && l.famille.includes(filtre))
        }
        currentLevel = level;
        await (tick);
        if (navCard && navCard.style && card && card.offsetHeight)
            navCard.style.height = card.offsetHeight + 'px';
    }

</script>
        {#key currentLevel}
		<div class="colposts" in:fly={{easing : quadInOut, x:2000, duration:500, delay:200}} out:fly={{easing : quadInOut, x:-2000, duration:500}} >
			<div class="columns is-multiline has-background-primary-light cols-produits is-variable is-1 padding-posts"
                out:slide={{easing : quadInOut, duration:500 }}
            >
                <div class="column is-one-third is-half-touch mb-0">
					<div class="card mb-2 mt-2" bind:this={navCard} >
                        {#if !currentLevel}
                        <div class="card-image" on:click={()=>changeLevel(1)}>
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

						<div class="flexbase" style="height:100%;" on:click={()=>changeLevel(currentLevel === 2 ? 1 : 0, currentLevel === 1 ? 'normal' : null)}>
                            <img src={"/img/back.png"} alt={"Retour à la liste des produits"} class="retour" />
                            <h2 class="title is-3 has-text-primary has-text-centered has-text-weight-light" style="position:relative;top:1em;">
                                {currentLevel === 1 ? "Retour à la liste\ndes produits" : "Retour à la liste\ndes lavabos"}
                            </h2>
						</div>
                        {/if}
					</div>
				</div>

<!-- GAMME LAVABOS -->

                {#if currentLevel === 1}
                    <div class="column is-one-third is-half-touch mb-0">
                        <div class="card mb-2 mt-2" on:click={()=>changeLevel(2, 'alize')} bind:this={card} >
                            <div class="card-image">
                                <figure class="image">
                                    <div class="card-thumb">
                                        <Image src={"/img/lavabo.svg"} alt={"Section Lavabos"} />
                                    </div>
                                </figure>
                            </div>
                            <div class="card-content">		  
                                <div class="content">
                                    <h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">Gamme Alizé</h2>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <div class="button is-success has-text-weight-bold is-uppercase">découvrir</div>
                            </footer>
                        </div>
                    </div>
                    <div class="column is-one-third is-half-touch mb-0">
                        <div class="card mb-2 mt-2" on:click={()=>changeLevel(2, 'bloc')} >
                            <div class="card-image">
                                <figure class="image">
                                    <div class="card-thumb">
                                        <Image src={"/img/lavabo.svg"} alt={"Section Lavabos"} />
                                    </div>
                                </figure>
                            </div>
                            <div class="card-content">		  
                                <div class="content">
                                    <h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">Auges gamme Bloc</h2>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <div class="button is-success has-text-weight-bold is-uppercase">découvrir</div>
                            </footer>
                        </div>
                    </div>
                    <div class="column is-one-third is-half-touch mb-0">
                        <div class="card mb-2 mt-2"on:click={()=>changeLevel(2, 'ocea')} >
                            <div class="card-image">
                                <figure class="image">
                                    <div class="card-thumb">
                                        <Image src={"/img/lavabo.svg"} alt={"Section Lavabos"} />
                                    </div>
                                </figure>
                            </div>
                            <div class="card-content">		  
                                <div class="content">
                                    <h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">Gamme Océa</h2>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <div class="button is-success has-text-weight-bold is-uppercase">découvrir</div>
                            </footer>
                        </div>
                    </div>

<!-- LISTE FILTREE -->
                {:else}
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
                {/if}
			</div>
		</div>
        {/key}
        
        <div class="invisible-links">
        {#each posts as post}
                <a href="produits/{post.slug}">{post.slug}</a>
        {/each}
        </div>


<style>
    .invisible-links{
        opacity: 0;
        position: absolute;
        pointer-events: none;
    }
    
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