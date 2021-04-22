<script>
	import { onMount, tick } from 'svelte';
	import { animAssets } from './lignes.js'
	import { refresh } from '../utils/stores.js'
	import { stores } from '@sapper/app';
	const { page, preloading } = stores();

	export let headerType = 'sombre';

	$: ($page.path && $preloading) && setRefresh();

	let setRefresh = async()=> {
		$refresh = true;
		await tick();
		return new Promise( resolve => {
			$refresh = false;
			tick().then( _ => resolve(svgs.forEach(s => s && s.beginElement()))  );
		});
	}

	let svgs = [];
	let isMobile;
	let cerclesEls = [];
	
	onMount( async() => {
		isMobile = (typeof window !== 'undefined') && (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
		for (let cercle of animAssets[headerType].cercles ) {
			const multiple = isMobile ? 2 : 1;
			cercle.peri = Math.ceil(Math.PI * 2 * cercle.rayon);
			cercle.stroke = Array(Math.ceil(cercle.peri  / (cercle.tiret ? cercle.tiret * multiple : 5 ))).fill(cercle.tiret ? cercle.tiret * multiple : 5)
			if (cercle.stroke.length % 2 !== 0) 
				cercle.stroke.pop();
			cercle.stroke = ([...cercle.stroke, 0, cercle.peri]).join(' ');
		}
		$refresh = false;
		svgs.forEach(s => { s.beginElement()});
		cerclesEls.forEach(c=> c.style.animationDuration = `${c.duree}s`);
	});

	let restartLine = async (index) => {
		return new Promise( resolve => {
			resolve(svgs[index].beginElement());
		});
	}

</script>
<div class="svg-container">
    <div class="logo-container" style="transform:translate(-50%, -{animAssets[headerType].options.siglePointilles ? "65" : "77"}%)">
		{#if headerType == 'sombre'}
			<img src="./img/logo.png" class="mb-5 logo-edra" alt="logo edra">
		{:else}
			<img src="./img/sigle_pointilles.png" class="mb-5" alt="logo edra" width="128px">
		{/if}
	{#if animAssets[headerType].options.title}
		<h1 class="title is-2 has-text-weight-bold mb-4" style="color:{animAssets[headerType].options.linesColor};text-transform:uppercase">{animAssets[headerType].options.title}</h1>
	{/if}
    </div>

	{#if !$refresh}
	<svg height="820" width="720" id="svg" xmlns="http://www.w3.org/2000/svg"  
	preserveAspectRatio="xMidYMid slice"
	viewBox="0 0 1344 1079"
	version="1.1" style="background:{animAssets[headerType].options.bgColor}">

		{#each animAssets[headerType].lignes as ligne, index(ligne.id)}
			{#if !isMobile || (isMobile && !ligne.isHiddenMobile) }
				<line id={ligne.id}
					x1={ligne.x1} y1={ligne.y1} x2={ligne.x2} y2={ligne.y2} 
					stroke={animAssets[headerType].options.linesColor} 
					stroke-width={ligne.contour}
					stroke-dasharray={ligne.tirets}
					class:debug={ligne.debug}
					class:is-hidden-touch={ligne.isHiddenMobile}
				>
						<animate begin="indefinite" bind:this={svgs[index]}
							id="{ligne.id}anim1" attributeType="XML"
							attributeName="x2" from={ligne.x1} to={ligne.x2} 
							dur={ligne.duree} 
						/>

						<animate begin="{ligne.id}anim1.begin"
							id="{ligne.id}anim2" attributeType="XML" attributeName="y2"  
							from={ligne.y1} to={ligne.y2} 
							dur={ligne.duree}
						/>
						
						<animate
							id="{ligne.id}anim3" attributeType="XML" attributeName="x1"
							begin="{ligne.id}anim1.end - {ligne.retardRepli}s" 
							from={ligne.x1} to={ligne.x2} 
							dur={ligne.dureeRepli}
						/>
						<animate on:endEvent={()=> restartLine(index)}
							id="{ligne.id}anim4" attributeType="XML" attributeName="y1" 
							begin="{ligne.id}anim2.end - {ligne.retardRepli}s" 
							from={ligne.y1} to={ligne.y2} 
							dur={ligne.dureeRepli}
						/>
						<animate id="opa1"
							attributeName="opacity" from="0" to="1" dur="0.1s" fill="freeze"
							begin="0s;{ligne.id}anim2.begin" />
						<animate id="opa2" fill="freeze"
							attributeName="opacity" from="1" to="0" dur="0.1s" 
							begin="{ligne.id}anim4.begin + {(ligne.dureeRepli)-0.1}s" 
						/>
				</line>
			{/if}
		{/each}

		{#each animAssets[headerType].cercles as cercle, index (cercle.id)}
			{#if !isMobile || (isMobile && !cercle.isHiddenMobile) }
			<circle 
				class="circle-path"
				class:debug={cercle.debug}
				bind:this={cerclesEls[index]}
				stroke={animAssets[headerType].options.linesColor}
				transform="rotate({cercle.rotation})"
				stroke-dasharray={cercle.stroke}
				stroke-dashoffset={cercle.peri}
				fill="none"
				id={cercle.id}
				
				cy={cercle.y}
				cx={cercle.x}
				r={cercle.rayon}>

				{#if cercle.reversed}
				<animate 
					attributeName="stroke-dashoffset" stroke-width="1"
					dur="{cercle.duree*2}s" repeatCount="indefinite" fill="freeze"
					values="0; {-cercle.peri}; {+cercle.peri}"
					keyTimes="0; 0.5; 1"	
				/>
				{:else}
				<animate 
					attributeName="stroke-dashoffset" stroke-width="1"
					dur="{cercle.duree*2}s" repeatCount="indefinite" fill="freeze"
					values="{cercle.peri}; 0; {-cercle.peri}"
					keyTimes="0; 0.5; 1"	
				/>
				{/if}
				<animateTransform attributeName="transform"
					attributeType="XML"
					type="rotate"
					from="{cercle.rotation} {cercle.x} {cercle.y}"
					to="{360+cercle.rotation} {cercle.x} {cercle.y}"
					dur="{cercle.duree*2}"
					repeatCount="indefinite"
				/>
			</circle>
			{/if}
		{/each}
		
	</svg>
	{/if}

</div>

<style>
	
	.debug {
		outline : 1px orange solid;
	}

	.svg-container {
		position:absolute;
		width:fill-available;
		height:1079px;
	}

	.logo-container {
		position: absolute;
		top: 53%;
		left: 50%;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	#svg {
		position:absolute;
		left:0;
		top:0;
		width:100%;
		min-height:100%;
		transform:rotateX(45deg);
	}
	@media screen and (max-width: 1024px) {
		svg {
			position: inherit;
			height: fill-available;
			min-width: fill-available;
		}
		svg, #svg {
			width : unset;
		}
		.svg-container {
			height: calc(100vh + 768px);
			transform-origin: top;
		}
		.logo-container {
			position: relative;
    		top: 50%;
		}
		.logo-container img {
			height:auto;
			width:8vmax;
		}
	}

</style>