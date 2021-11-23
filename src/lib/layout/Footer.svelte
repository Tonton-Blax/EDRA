<script>
	export let segment;
</script>

<style>
	.edra-footer {
		display: flex;
    	flex-flow: column nowrap;
    	justify-content: center;
		height:336px;
		max-height:336px;
		padding:10% 30%;
		overflow:hidden;
	}
	@media screen and (max-width: 1024px) {
		.container {
			padding-bottom:0px;
		}
		.logo-wrapper {
			align-self:center;
		}
	}
	@media screen and (min-width: 1024px) {
		.logo-wrapper {
			align-self:flex-end;
		}
	}
	a {
		color:white;
	}
	a:hover{
		text-decoration: underline;
	}

</style>

<div class="container">
	<div class="columns is-gapless is-multiline" class:has-background-primary={segment !== 'concept'} class:has-background-info={segment === 'concept'}>
		<div class="column is-half">
			<div class="edra-footer has-text-white">
				{#if segment === 'concept'}
				<a class="is-size-2 is-size-3-touch" style="align-self:flex-start; overflow-x:visible; width:max-content;" href="/contact">CONTACTEZ-NOUS</a><br>
				{/if}
                <p class="is-size-6" style="align-self:flex-start   ">© EDRA 2021<br>
                    <a href='/mentions'>Mentions légales RGPD</a>
                </p>
				<h1 class="is-size-6" style="align-self:flex-start   ">© EDRA 2021<br>
                    Réalisation : Maxime et Tibo Redval
                </h1>
            </div>
        </div>
        <div class="column is-half">
			<div class="edra-footer has-text-white">
                <a href="/" class="logo-wrapper"><img class="logo" alt="logo" src="../img/logo.png"></a>
            </div>
        </div>

    </div>
</div>