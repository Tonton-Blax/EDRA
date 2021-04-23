<script>
    export let posts = [];
    import { goto } from '@sapper/app';
    import Image from "svelte-image";

</script>
		<div class="colposts">
			<div class="columns is-multiline has-background-primary-light cols-produits is-variable is-1 padding-posts">
				{#each posts as post}
				<div class="column is-one-third is-half-touch mb-0">
					<div class="card mb-2 mt-2" on:click={()=> goto(`produits/${post.slug}`, {noscroll : true})} >
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
<style>

    .button {
        border-radius:0px;
    }
    .padding-posts {
        padding-top:2rem;
        padding-bottom:2rem;
    }
    :global(.card-thumb, .card-thumb img) {
        height : 200px!important;
        width:auto;
        min-width:100%;
        object-fit:cover;
        border-radius: 0px;
    }

    .card {
        cursor: pointer;
    }

    .colposts {
        padding : 2em 2.5rem;
        background : var(--lightblue)
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
        a.button {
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