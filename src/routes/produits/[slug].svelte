<script context="module">                                                                                                                                                                                                                                                                   
	export async function preload({ params, query }) {
	  const res = await this.fetch(`produits/${params.slug}.md`);
  	  if (res.status === 200) {
		return { postMd: await res.text() };
	  } else {
		this.error(res.status, data.message);
	  }
	}
  </script>
  
  <script>
	import fm from 'front-matter';
	import marked from 'marked';
	export let postMd;
	let produit = fm(postMd).attributes;
	const allTokens = produit.contenu.map(p => marked.lexer(p))
	console.log(allTokens[0]);
  </script>

<div class="container">
	<div class="columns is-gapless is-multiline">
		<div class="column is-full">
			<div class="edra-block no-padding has-text-white">
				<div class="overblock">
					<h3 class="title is-3 has-text-primary has-text-weight-bold">{produit.title}</h3>
					<p class="has-text-primary has-text-left">{produit.subtitle}</p>
				</div>
				<div class="img-container image">
					{#if produit.thumbnail.length}
						<img src={produit.thumbnail} class="autoheight" alt="{produit.slug}" />
					{/if}
				</div>
			</div>
			{#each allTokens as tokens}
			<div class="edra-contenu">
				{#each tokens as token}
					{#if token.type && token.type === 'blockquote'}
					<div class="edra-heading has-background-primary">
						{#each token.tokens as heading, index}
							{#if heading.type !== 'space' && index == 0}
								<h2 class="title has-text-white has-text-weight-bold is-3">{heading.text}</h2>
							{:else if heading.type !== 'space' && index !== 0}
								<h2 class="title has-text-white has-text-weight-normal is-55">{@html marked(heading.text)}</h2>
							{/if}
						{/each}
					</div>
					{/if}
					{#if token.type && token.type === 'heading'}
						<h3 class="title has-text-primary has-text-weight-normal is-{2+(token.depth)}">{token.text}</h3>
					{/if}
					{#if (token.type && token.type === 'paragraph') && (token.tokens && token.tokens[0] && token.tokens[0].type && token.tokens[0].type ==='text')}
						<p>{@html marked(token.text)}</p>
					{/if}
				{/each}
			</div>
			{/each}
		</div>
	</div>
</div>


<style>

.edra-contenu {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	height: auto;
	padding:1rem 2rem;
	overflow-x:hidden;
	overflow-y:auto;
}
.edra-heading {
	width: fit-content;
	padding:2.5rem;
}
.edra-heading > * {
	line-height: 1rem;
}
:global(.edra-heading strong) {
	font-weight:700;
}
.is-55 {
	font-size:1.1rem;
}
</style>