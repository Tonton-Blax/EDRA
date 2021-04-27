<svelte:window on:scroll={handleScroll} on:click={handleClick} />

<script>
	import { fade, slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { observing, colors } from '../utils/stores.js';
	import { isMobileDevice } from '../utils/utils.js';
	import { stores } from '@sapper/app';
	const { page } = stores();
	
	$: isMobile = isMobileDevice();

	export let segment;
	let isScrolling;
	let isIdle = true;
	let menuIsActive = false;
	let navbar;

	const handleClick = (e) => {
		if (!navbar.contains(e.target))
			menuIsActive = false;
	}

	const handleScroll = async () => {
		if (isMobile)
			return;
		isIdle = false;
		window.clearTimeout( isScrolling );
		isScrolling = setTimeout(function() {
			isIdle = true;
		}, 300);
	}

	let indicator; let navItems = [];

	function handleIndicator(idx) {
		if (isMobile)
			return;
		navItems.forEach(function (item) {
			item.classList.remove('active-item');
			item.removeAttribute('style');
		});
		indicator.style.width = "".concat(navItems[idx].offsetWidth, "px");
		indicator.style.left = "".concat(navItems[idx].offsetLeft, "px");
		indicator.style.backgroundColor = $observing && segment != 'produits' ? "white" : $colors.main;
		navItems[idx].classList.add('active-item');
		navItems[idx].style.color = $observing && segment != 'produits' ? "white" : $colors.main;
	}

	page.subscribe(({ }) => {
		if (!navItems.length || isMobile)
			return;
  		[0,1,2].forEach(h => {
			indicator.style.backgroundColor = $observing && segment != 'produits' ? "white" : $colors.main;
			navItems[h].style.color = $observing || segment != 'produits' ? "white" : $colors.main;
		  });
	})


</script>

{#if isMobile || isIdle}
<div class="container">
<nav
	class="navbar {$observing && !isMobile ? "is-transparent" : "iswhite"}" 
	role="navigation" aria-label="main navigation" 
	in:fade={{duration:1000, delay:50, easing: quadInOut}} 
	out:fade={{duration:400, delay:0, easing: quadInOut}} 
	bind:this={navbar} 
>
	<div class="navbar-brand">
	  <a class="navbar-item unlink" href="/" style="cursor:pointer;">
			<img src="../img/logo-sigle.png" height="28" alt="logo EDRA">
	  </a>
  
	  	<button
			on:click={() => menuIsActive = !menuIsActive}
			class="navbar-burger burger" class:forceblue={segment == 'produits'} aria-label="menu" aria-expanded="false" class:is-active={menuIsActive}>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
		</button>
	</div>
	<div class="navbar-end is-hidden-touch" >
		<a class:forceblue={segment == 'produits'} bind:this={navItems[0]} on:mouseenter={()=>handleIndicator(0)} class="navbar-item active-item" aria-current={segment === undefined ? 'page' : undefined} href="." on:click={() => menuIsActive = false}>EDRA</a>
		<a class:forceblue={segment == 'produits'} bind:this={navItems[1]} on:mouseenter={()=>handleIndicator(1)} rel="prefetch" class="navbar-item" aria-current={segment === 'produits' ? 'page' : undefined} href="produits" on:click={() => menuIsActive = false}>Produits</a>
		<a class:forceblue={segment == 'produits'} bind:this={navItems[2]} on:mouseenter={()=>handleIndicator(2)} class="navbar-item" aria-current={segment === 'contact' ? 'page' : undefined} on:click={() => menuIsActive = false} href="contact">Contact</a>
		<a class:forceblue={segment == 'produits'} bind:this={navItems[3]} on:mouseenter={()=>handleIndicator(3)} class="navbar-item" aria-current={segment === 'concept' ? 'page' : undefined} on:click={() => menuIsActive = false} href="concept">EDRA Concept</a>
		<span class="navbar-indicator" bind:this={indicator}></span>


	</div>  
	{#if menuIsActive}
	<div class="navbar-menu" class:is-active={menuIsActive} transition:slide={{easing: quadInOut}} >
	  <div class="navbar-start">
		<a class:forceblue={segment == 'produits'} rel="prefetch" class="navbar-item moblink" aria-current={segment === 'produits' ? 'page' : undefined} href="produits" on:click={() => menuIsActive = false}>Produits</a>
		<a class:forceblue={segment == 'produits'} class="navbar-item moblink" aria-current={segment === undefined ? 'page' : undefined} href="." on:click={() => menuIsActive = false}>EDRA</a>
		<a class:forceblue={segment == 'produits'} class="navbar-item moblink" aria-current={segment === 'contact' ? 'page' : undefined} on:click={() => menuIsActive = false} href="contact">Contact</a>
		<a class:forceblue={segment == 'produits'} class="navbar-item moblink" aria-current={segment === 'concept' ? 'page' : undefined} on:click={() => menuIsActive = false} href="concept">EDRA Concept</a>
		<span class="navbar-indicator"></span>

	  </div>  
	</div>
	{/if}
  </nav>
</div>
{/if}



<style>

* {
	 box-sizing: border-box;
}

.navbar-burger {
	border:none;
}

.is-transparent a:not(.forceblue) {
	color:white;
}
.forceblue, a.forceblue, a.forceblue:visited, a.forceblue:hover, a.forceblue:active, a.forceblue:active {
	color:var(--maincolor)!important;
}
.is-transparent {
	background:none;
}
.iswhite {
	background:white;
	box-shadow : 0px 1px 10px rgba(127,127,127,0.25);
}
.iswhite a {
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

.navbar-item {
	z-index: 1;
}
.navbar-item:hover {
	background-color:unset!important;
}
.navbar-item:before:not(.unlink) {
	content: "";
	position: absolute;
	bottom: -6px;
	left: 0;
	width: 100%;
	height: 5px;
	background-color: #dfe2ea;
	border-radius: 8px 8px 0 0;
	opacity: 0;
	transition: 0.3s;
}
.navbar-item:not(.active-item):hover:before {
	opacity: 1;
	bottom: 0;
}
.navbar-item:not(.active-item):hover {
	color: unset;
}
.navbar-indicator {
	position: absolute;
	left: 0;
	bottom: 15px;
	transition: 0.4s;
	height: 2px;
	z-index: 1;
}

@media only screen and (max-width: 1024px) {

	.navbar-brand {
		min-height: unset!important;
		height:100%;
		margin-left:3%;
		padding-top:0.5rem;
	}

	.navbar-menu.is-active {
    	height: 100vh;
	}
	.navbar-menu.is-active .navbar-start {
		display: flex;
    	flex-direction: column;
    	align-items: center;
    	height: 90%;
		width: 94%;
    	place-content: center;
	}

	.navbar {
		overflow: hidden;
		position: initial;
		max-width: inherit;
		width:fill-available;
		display: block;
		position:fixed;
		min-height:7.5rem;
	}
	.navbar a {
		text-transform :uppercase;
		font-size:3em!important;
	}
	a.moblink, a.moblink:active, a.moblink:hover, a.moblink:visited {
		color : var(--maincolor);
		font-size:2em;
		line-height:2em;
		margin-left:2em;
	}
	
	.navbar-burger {
		background-color : transparent;
		height:6.5rem;
		width:6.5rem;
		color:var(--maincolor);
	}
	.a.forceblue, a.forceblue:hover, a.forceblue:visited, a.forceblue:active {
		color:var(--maincolor)!important;
	}
	.navbar-menu, .navbar-menu.is-active {
		box-shadow: none;
	}
	.navbar-burger {
		transform:scale(3);
	}
	.navbar-item img {
 	   	max-height: 2.75rem;
		margin-right: 2em;
	}

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
	a:active {
		color:unset!important;
	}
}

</style>

