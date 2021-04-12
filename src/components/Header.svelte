<script>
	import { draw } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import { lignes, cercles } from './lignes.js'
	import { refresh } from '../utils/stores.js'

	export let options = {
		bgColor : "#005476",
		linesColor : "white",
		siglePointilles : false,
		title : undefined
	}

	$: $refresh && setRefresh();

	let setRefresh = async()=> {
		await tick();
		$refresh = false;
		await tick();
		svgs.forEach(s => s && s.beginElement())
	}

	let svgs = []; 
	let cerclesEls = [];
	
	for (let cercle of cercles ) {
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
    <div class="logo-container" style="transform:translate(-50%, -{options.siglePointilles ? "50" : "77"}%)">
	{#if options.siglePointilles}
		<svg class="mb-4"
		width="122px" height="139px" viewBox="0 0 122 139" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<title>Logo</title>
			<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-dasharray="3">
				<g transform="translate(-640.000000, -197.000000)" stroke="#005476">
					<g transform="translate(-132.000000, 0.000000)">
						<g id="Titre" transform="translate(414.000000, 198.000000)">
							<path transition:draw={{delay: 1000, duration: 1000}} d="M418.886183,137.102629 C418.215267,137.102629 417.545967,136.929646 416.946183,136.583679 L360.938383,104.247113 C359.738817,103.555179 359,102.273163 359,100.887679 L359,36.2161625 C359,34.8306792 359.738817,33.5486625 360.938383,32.8567292 L416.946183,0.5201625 C418.147367,-0.1733875 419.625,-0.1733875 420.826183,0.5201625 L476.832367,32.8567292 C478.031933,33.5486625 478.773166,34.8306792 478.773166,36.2161625 C478.773166,37.6032625 478.031933,38.8836625 476.832367,39.5772125 L428.130283,67.6942792 C426.271117,68.7677458 423.9027,68.1291625 422.829233,66.2748458 C421.759,64.4189125 422.39435,62.0456458 424.250283,60.9737958 L467.132367,36.2161625 L418.886183,8.36099583 L366.758383,38.4568625 L366.758383,98.6469792 L418.886183,128.742846 L472.952367,97.5266292 C474.806683,96.4515458 477.181567,97.0901292 478.253417,98.9460625 C479.32365,100.801996 478.6883,103.175263 476.832367,104.247113 L420.826183,136.583679 C420.2264,136.929646 419.5571,137.102629 418.886183,137.102629" id="Logo"></path>
						</g>
					</g>
				</g>
			</g>
		</svg>
	{:else}
		<img src="./img/logo.png" class="mb-5" alt="logo edra">
	{/if}
	{#if options.title && options.title.subTitle}
		<h1 class="title is-2 has-text-weight-bold mb-4" style="color:{options.linesColor};text-transform:uppercase">{options.title.title}</h1>
		<h3 class="title is-5 has-text-weight-normal is-subtitle" style="color:{options.linesColor};">{options.title.subTitle || ""}</h3>
	{/if}
    </div>

	{#if !$refresh}
	<svg height="820" width="720" id="svg" xmlns="http://www.w3.org/2000/svg"  version="1.1" style="background:{options.bgColor}">

		{#each lignes as ligne, index(ligne.id)}
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

		{#each cercles as cercle, index (cercle.id)}
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