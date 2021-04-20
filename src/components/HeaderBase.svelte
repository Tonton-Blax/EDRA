<script>
	import { onMount, tick } from 'svelte';
	import { stuffToDraw } from './lignes.js'
	import { refresh } from '../utils/stores.js'
	import { stores } from '@sapper/app';
	const { page, preloading } = stores();

	const options = {
		siglePointilles : false,
		bgColor: "#005476",
		linesColor: "white",
		title:undefined,
		lignes : stuffToDraw.lignes,
		cercles : stuffToDraw.cercles
	}
		
	$: ($page.path && $preloading) && setRefresh();

	let setRefresh = async()=> {
		$refresh = true;
		await tick();
		$refresh = false;
		await tick();
		svgs.forEach(s => s && s.beginElement())
	}

	let svgs = []; 
	let cerclesEls = [];
	
	for (let cercle of options.cercles ) {
		cercle.peri = Math.ceil(Math.PI * 2 * cercle.rayon);
		cercle.stroke = Array(Math.ceil(cercle.peri  / 5)).fill(5)
		if (cercle.stroke.length % 2 !== 0) 
			cercle.stroke.pop();
		cercle.stroke = ([...cercle.stroke, 0, cercle.peri]).join(' ');
	}

	onMount( async() => {
		$refresh = false;
		svgs.forEach(s => { s.beginElement()});
		cerclesEls.forEach(c=> c.style.animationDuration = `${c.duree}s`);
	});

	let restartLine = async (index) => {
		svgs[index].beginElement();
	}

</script>
<div class="svg-container">
    <div class="logo-container" style="transform:translate(-50%, -{options.siglePointilles ? "65" : "77"}%)">
		<img src="./img/logo.png" class="mb-5" alt="logo edra">
	{#if options.title}
		<h1 class="title is-2 has-text-weight-bold mb-4" style="color:{options.linesColor};text-transform:uppercase">{options.title.title}</h1>
	{/if}
	{#if options.title && options.title.subTitle}
		<h3 class="title is-5 has-text-weight-normal is-subtitle" style="color:{options.linesColor};">{options.title.subTitle || ""}</h3>
	{/if}
    </div>

	{#if !$refresh}
	<svg height="820" width="720" id="svg" xmlns="http://www.w3.org/2000/svg"  version="1.1" style="background:{options.bgColor}">

		{#each options.lignes as ligne, index(ligne.id)}
				<line id={ligne.id} stroke-dasharray={ligne.tirets}
					x1={ligne.x1} y1={ligne.y1} x2={ligne.x2} 
					y2={ligne.y2} stroke={options.linesColor} stroke-width={ligne.contour}
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
		{/each}

		{#each options.cercles as cercle, index (cercle.id)}
			<circle 
			class="circle-path"
			class:reversed={cercle.reversed}
			bind:this={cerclesEls[index]}
			stroke={options.linesColor}
			style="transform:rotate({cercle.rotation}deg);stroke-dasharray:{cercle.stroke};stroke-dashoffset:{cercle.peri};"
			
			transform-origin="{cercle.x} {cercle.y}"
			cy={cercle.y}
			cx={cercle.x}
			r={cercle.rayon}></circle>
		{/each}
		
	</svg>
	{/if}

</div>
<style>
	.svg-container {
		position:absolute;
		width:fill-available;
		height:1079px;
	}
	.is-subtitle {
		width: 437px;
    	text-align: justify;
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
	.circle-path {
  		stroke-dashoffset: 628.3;
  		animation: dashed-line 5s linear alternate infinite;
	}

	
	@keyframes dashed-line {
  		to {
    		stroke-dashoffset: 0;
	  	}
	}

	circle {
		stroke-width: 1;
		stroke-opacity: 1;
		stroke-dasharray: 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
												5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
						5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
						5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
						5 5 5 5 5 5 0 630;
		fill: none;
	}
</style>