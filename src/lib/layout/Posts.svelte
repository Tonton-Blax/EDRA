<script>
    export let posts = [];
    import { fly, slide } from 'svelte/transition'
    import { quadInOut } from 'svelte/easing';
    import { onMount, onDestroy, tick } from 'svelte';
    import lazyload from 'vanilla-lazyload'
    import { page } from '$app/stores';
    import { browser } from '$app/env';
    import { getFileName } from '$lib/utils/utils'


    export let currentLevel = 0;
    let card, navCard;
    let currentPosts = []
    let lazyloadInstance;
    $: $page.paramas, lazyloadInstance && lazyloadInstance.update()
    
    if (browser)
        lazyloadInstance = new lazyload();

    onMount(async()=>{
        currentPosts = posts.filter(l => currentLevel == 1 ? (l.famille !== 'normal') : (!l.famille || l.famille === 'normal'));
        await tick();
        if (navCard && navCard.style && navCard.style.height)
            navCard.style.height = card.offsetHeight + 'px';
    });

    onDestroy(()=> lazyloadInstance && lazyloadInstance.destroy())

    async function changeLevel (level) {
        currentLevel = level;
        currentPosts = posts.filter(l => level == 1 ? l.famille !== 'normal' : (!l.famille || l.famille === 'normal'));
        await (tick);
        if (navCard && navCard.style && card && card.offsetHeight)
            navCard.style.height = card.offsetHeight + 'px';
        setTimeout(()=>lazyloadInstance.update(),50)
    }


</script>
{#if posts && posts.length}
        {#key currentLevel}
		<div class="colposts" in:fly|local={{easing : quadInOut, x:2000, duration:500, delay:200}} out:fly={{easing : quadInOut, x:-2000, duration:500}} >
			<div class="columns is-multiline has-background-primary-light cols-produits is-variable is-1 padding-posts"
                out:slide|local={{easing : quadInOut, duration:500 }}
            >
            {#each currentPosts as post}
				<div class="column is-one-third is-half-touch mb-0">
					<a href="/produits/{post.slug}">
                    <div class="card" bind:this={card}>
						<div class="card-image">
							<figure class="image">
                                <div class="card-thumb">
                                    <img class="lazy" src="/img/lowres/{getFileName(post.vignette && post.vignette.length ? post.vignette : post.thumbnail)}__400.webp" data-src="/img/lowres/{getFileName(post.vignette && post.vignette.length ? post.vignette : post.thumbnail)}__400.webp" alt={post.title} />
                                </div>
								<!-- <img class="lazy" src={post.thumbnail} alt="{post.title}"> -->
							</figure>
						</div>
						<div class="card-content">
							<div class="content">
								<h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">{@html post.title}</h2>
							</div>
						</div>
						<footer class="card-footer">
							<div class="button is-success has-text-weight-bold is-uppercase">découvrir</div>
						</footer>
					</div>
                    </a>
				</div>
            {/each}
                <div class="column is-one-third is-half-touch mb-0">
					<div class="card" bind:this={navCard} >
                        {#if currentLevel==0}
                        <div class="card-image" on:click={()=>changeLevel(1)}>
							<figure class="image">
                                <div class="card-thumb">
                                    <img class="lazy" data-src={"/img/initial/gamme-alize.jpg"} alt={"Section Lavabos"} />
                                </div>
							</figure>
						</div>
						<div class="card-content">		  
							<div class="content">
								<h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">Lavabos aseptiques<br>&nbsp;<br></h2>
							</div>
						</div>
						<footer class="card-footer">
							<div on:click={()=>changeLevel(1)} class="button is-success has-text-weight-bold is-uppercase">découvrir</div>
						</footer>

                        {:else}

                        <div class="card-image" on:click={()=>changeLevel(0)}>
							<figure class="image">
                                <div class="card-thumb">
                                    <img class="lazy" data-src={"/img/initial/back.jpg"} alt={"Section Lavabos"} />
                                </div>
							</figure>
						</div>
						<div class="card-content">		  
							<div class="content">
								<h2 class="title is-4 has-text-primary has-text-left has-text-weight-bold">Retour à la liste<br>des produits</h2>
							</div>
						</div>
						<footer class="card-footer">
							<div on:click={()=>changeLevel(0)} class="button is-success has-text-weight-bold is-uppercase">RETOUR</div>
						</footer>
<!--

						<div class="flexbase" style="height:374.8px;" on:click={()=>changeLevel(0)}>
                            <img class="retour" src={"/img/back.png"} alt={"Retour à la liste des produits"} />
                            <h2 class="title is-3 has-text-primary has-text-centered has-text-weight-light" style="position:relative;top:1em;">
                                {currentLevel === 1 ? "Retour à la liste\ndes produits" : "Retour à la liste\ndes produits"}
                            </h2>
						</div>
-->
                        {/if}
					</div>
				</div>

<!-- GAMME LAVABOS -->

<!-- LISTE FILTREE -->
				
			</div>
		</div>
        {/key}
        
        <div class="invisible-links">
        {#each posts as post}
                <a href="/produits/{post.slug}">{post.slug}</a>
        {/each}
        </div>
{/if}

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
        height:385px;
        border-radius: 4px;
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

    @media screen and (min-width: 1024px) {
        .card {
            margin-top:0px;
            margin-bottom:0px;
        }
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
        .card {
            margin-bottom:2.5em!important;
        }
    }

</style>