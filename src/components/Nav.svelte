<svelte:window on:scroll={handleScroll} on:click={handleClick} />

<script>
	import { fade, slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import {observing} from '../utils/stores.js';
	export let segment;
	let isScrolling;
	let isIdle = true;
	let menuIsActive = false;
	let navbar;

	const handleClick = (e) => {
		if (!navbar.contains(e.target))
			menuIsActive = false;
	}

	const handleScroll = () => {
		isIdle = false;
		window.clearTimeout( isScrolling );

		isScrolling = setTimeout(function() {
			isIdle = true;
		}, 300);
	}


</script>

{#if isIdle}
<div class="container">
<nav class="navbar {$observing ? "is-transparent" : "is-white"}" role="navigation" aria-label="main navigation" in:fade={{duration:1000, delay:50, easing: quadInOut}} out:fade={{duration:400, delay:0, easing: quadInOut}} bind:this={navbar} >
	<div class="navbar-brand">
	  <a class="navbar-item" href="/">
			<img src="../img/logo-sigle.png" height="28" alt="logo EDRA">
	  </a>
  
	  	<button
			on:click={() => menuIsActive = !menuIsActive}
			class="navbar-burger burger" aria-label="menu" aria-expanded="false" class:is-active={menuIsActive}>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
		</button>
	</div>
	<div class="navbar-end is-hidden-touch">
		<a class="navbar-item" aria-current={segment === undefined ? 'page' : undefined} href="." on:click={() => menuIsActive = false}>EDRA</a>
		<a rel="prefetch" class="navbar-item" aria-current={segment === 'produits' ? 'page' : undefined} href="produits" on:click={() => menuIsActive = false}>Produits</a>
		<a class="navbar-item" aria-current={segment === 'contact' ? 'page' : undefined} on:click={() => menuIsActive = false} href="contact">Contact</a>

	</div>  
	{#if menuIsActive}
	<div class="navbar-menu" class:is-active={menuIsActive} transition:slide={{easing: quadInOut}} >
	  <div class="navbar-start">
		<a rel="prefetch" class="navbar-item" aria-current={segment === 'produits' ? 'page' : undefined} href="produits" on:click={() => menuIsActive = false}>Produits</a>
		<a class="navbar-item" aria-current={segment === undefined ? 'page' : undefined} href="." on:click={() => menuIsActive = false}>EDRA</a>
		<a class="navbar-item" aria-current={segment === 'contact' ? 'page' : undefined} on:click={() => menuIsActive = false} href="contact">Contact</a>
	  </div>  
	</div>
	{/if}
  </nav>
</div>
{/if}



<style>

	.navbar-burger {
		border:none;
	}

	.is-transparent a {
		color:white;
	}
	.is-transparent {
		background:none;
	}
	.is-white a {
		color:var(--maincolor)!important;
	}

	.navbar {
		overflow: hidden;
	  	position: fixed;
  		top: 0;
		max-width: inherit;
		width:fill-available;
  		display: flex;
  		align-items: center;
  		justify-content: center;
	}

	a {
		position:relative;
	}

	@media screen and (min-width: 1024px) {
		.navbar {
			min-height: 4.87rem;
			padding-left:1.5rem;
			padding-right: 1.5rem;
		}
		a:before {    
			content: "";
			position: absolute;
			width: 0;
			height: 2px;
			bottom: 0;
			left: 0;
			background-color: var(--secondary);
			visibility: hidden;
			transition: all 0.3s ease-in-out;
		}
		a:hover:before {
			visibility: visible;
			width: 100%;
		}
		
		/*
		.navbar-burger {
			display: block!important;
		}
		*/		
	}

	@media only screen and (max-width: 1024px) {
        .navbar-brand {
			min-height: unset!important;
			height:auto;
		}
	}
	

</style>

