<script>
    export let posts = [];
    import { goto } from '@sapper/app';

</script>
		<div class="colcontainer">
			<div class="columns is-multiline has-background-primary-light cols-produits is-variable is-5">

				{#each posts as post}
				<div class="column is-one-third mb-0">
					<div class="card" on:click={()=> goto(`produits/${post.slug}`, {noscroll : true})}>
						<div class="card-image">
							<figure class="image">
								<img src={post.thumbnail} alt="{post.title}">
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
				</div>
				{/each}
			</div>
		</div>

<style>

    .button {
        border-radius:0px;
    }
    .image img {
        height : 200px;
        width:auto;
        min-width:100%;
        object-fit:cover;
    }

    .card {
        cursor: pointer;
    }
  
    .card img {
        border-radius: 0px;
    }
    .card-content, .card-footer {
        background: white
    }
    .card-content {
        min-height: 7.3em;
    }
</style>