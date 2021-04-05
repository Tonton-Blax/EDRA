<script>
	import { draw } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import { navigating } from '$app/stores';
	export let bgColor = "#005476";
	export let linesColor = "white";
	export let siglePointilles = false;
	export let title = undefined;

	$: !$navigating && refresh()
	let ok = false;

	let refresh = async () => {
		ok = false; 
		await tick(); 
		ok = true
		await tick(); 
		svgs.forEach(s => { s !== null && s.beginElement() });
	}

	const lignes = [
  // Début des diagonales HD-BG
		{
			id : "ligne0",
			x1 : 0,
			y1 : 224,
			x2 : 252,
			y2 : 0,
			duree : 5,
			dureeRepli : 4,
			retardRepli : 1,
			tirets : 4,
			contour : 1,
			couleur : "#fff"
		},
		{
			id : "ligne1",
			x1 : 545,
			y1 : 0,
			x2 : 0,
			y2 : 484,
			duree : 5,
			dureeRepli : 4,
			retardRepli : 1,
			tirets : 6,
			contour : 2,
			couleur : "#fff"			
		},
		{
			id : "ligne2",
			x1 : 0, 
			y1 : 925,
			x2 : 967,
			y2 : 0,
			duree : 10,
			dureeRepli : 6,
			retardRepli : 4,
			tirets : 5,
			contour : 1,
			couleur : "#fff"
		},
		{
			id : "ligne3",
			x1 : 485,  
			y1 : 820,
			x2 : 194,
			y2 : 1079,
			duree : 6,
			dureeRepli : 4,
			retardRepli : 2,
			tirets : 5,
			contour : 2,
			couleur : "#fff"
		},
		{
			id : "ligne4",
			x1 : 1343, 
			y1 : 164,
			x2 : 1032,
			y2 : 440,
			duree : 4,
			dureeRepli : 3,
			retardRepli : 1,
			tirets : 4,
			contour : 1,
			couleur : "#fff"
		},
		{
			id : "ligne5",
			x1 : 681, 
			y1 : 1079,
			x2 : 1344,
			y2 : 491,
			duree : 5,
			dureeRepli : 3,
			retardRepli : 2,
			tirets : 5,
			contour : 2,
			couleur : "#fff"			
		},
		{
			id : "ligne6",
			x1 : 1130, 
			y1 : 1078,
			x2 : 1344,
			y2 : 888,
			duree : 4,
			dureeRepli : 3,
			retardRepli : 2,
			tirets : 4,
			contour : 1,
			couleur : "#fff"
		},
  // Début des diagonales HG-BD
		{
			id : "ligne7",
			x1 : 1343, 
			y1 : 304,
			x2 : 1002,
			y2 : 0,
			duree : 5,
			dureeRepli : 3,
			retardRepli : 2,
			tirets : 5,
			contour : 2,
			couleur : "#fff"
		},
		{
			id : "ligne8",
			x1 : 1344, 
			y1 : 718,
			x2 : 761,
			y2 : 200,
			duree : 9,
			dureeRepli : 6,
			retardRepli : 3,
			tirets : 6,
			contour : 1,
			couleur : "#fff"
		},
		{
			id : "ligne9",
			x1 : 1014, 
			y1 : 604,
			x2 : 1344,
			y2 : 897,
			duree : 5,
			dureeRepli : 3,
			retardRepli : 2,
			tirets : 5,
			contour : 2,
			couleur : "#fff"	
		},
		{
			id : "ligne10",
			x1 : 64, 
			y1 : 0,
			x2 : 530,
			y2 : 414,
			duree : 10,
			dureeRepli : 10,
			retardRepli : 0,
			tirets : 4,
			contour : 1,
			couleur : "#fff"
		},
		{
			id : "ligne11",
			x1 : 289, 
			y1 : 648,
			x2 : 776,
			y2 : 1080,
			duree : 6,
			dureeRepli : 4,
			retardRepli : 2,
			tirets : 4,
			contour : 2,
			couleur : "#fff"	
		},
		{
			id : "ligne12",
			x1 : 420, 
			y1 : 1079,
			x2 : 119,
			y2 : 808,
			duree : 5,
			dureeRepli : 4,
			retardRepli : 1,
			tirets : 4,
			contour : 1,
			couleur : "#fff"
		}
	];
	let cercles = [
		{
			id : "cercle1",
			y:604,
			x:1014,
			rayon:25,
			duree: 3,
			couleur : "white",
			rotation : 225,
			reversed : true
		},
		{
			id : "cercle2",
			y:604,
			x:1014,
			rayon:135,
			duree: 5,
			couleur : "white",
			rotation : 45,
			reversed : false
		},
		{
			id : "cercle3",
			y:400,
			x:88,
			rayon:283,
			duree: 7,
			couleur : "white",
			rotation : 180,
			reversed : false
		},
		{
			id : "cercle4",
			y:-480,
			x:1532,
			rayon:800,
			duree: 15,
			couleur : "white",
			rotation : 200,
			reversed : false
		},
		{
			id : "cercle5",
			y:317,
			x:-486,
			rayon:1000,
			duree: 20,
			couleur : "white",
			rotation : 130,
			reversed : false
		},
		{
			id : "cercle6",
			y:1480,
			x:799,
			rayon: 700,
			duree: 15,
			couleur : "white",
			rotation : 190,
			reversed : false
		},
		{
			id : "cercle7",
			y:720,
			x:1038,
			rayon: 700,
			duree: 15,
			couleur : "white",
			rotation : 10,
			reversed : false
		}
	];

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
		await tick();
		svgs.forEach( s => s !== null && s.beginElement() );
		cerclesEls.forEach( c =>  c !== null && (c.style.animationDuration = `${c.duree}s`));
	});
	let restartLine = async (index) => {
		svgs[index].beginElement();
	}

</script>
{#if ok}
<div class="svg-container">
    <div class="logo-container" style="transform:translate(-50%, -{siglePointilles ? "50" : "77"}%)">
	{#if siglePointilles}
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
		<img src="/img/logo.png" class="mb-5" alt="logo edra">
	{/if}
	{#if title && title.subTitle}
		<h1 class="title is-2 has-text-weight-bold mb-4" style="color:{linesColor};text-transform:uppercase">{title.title}</h1>
		<h3 class="title is-5 has-text-weight-normal is-subtitle" style="color:{linesColor};">{title.subTitle || ""}</h3>
	{/if}
    </div>
	<svg height="820" width="720" id="svg" xmlns="http://www.w3.org/2000/svg"  version="1.1" style="background:{bgColor}">
		


		{#each lignes as ligne, index(ligne.id)}
				<line id={ligne.id} stroke-dasharray={ligne.tirets}
					x1={ligne.x1} y1={ligne.y1} x2={ligne.x2} 
					y2={ligne.y2} stroke={linesColor} stroke-width={ligne.contour}
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
			stroke={linesColor}
			style="transform:rotate({cercle.rotation}deg);stroke-dasharray:{cercle.stroke};stroke-dashoffset:{cercle.peri};"
			
			transform-origin="{cercle.x} {cercle.y}"
			cy={cercle.y}
			cx={cercle.x}
			r={cercle.rayon}></circle>
		{/each}
		
	</svg>
</div>
{/if}
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
		stroke-dasharray: 	5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
							5 5 5 5 5 5 0 630;
		fill: none;
	}
</style>