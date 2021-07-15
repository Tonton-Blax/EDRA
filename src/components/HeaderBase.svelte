<script>
	import { onMount, tick } from 'svelte';
	import { animAssets } from './lignes.js'
	import { refresh } from '../utils/stores.js'
	import { stores } from '@sapper/app';
	import { isMobileDevice } from '../utils/utils.js';
	
	export let headerType = 'sombre';
	const { page, preloading } = stores();
	
	$: isMobile = isMobileDevice();
	$: ($page.path && $preloading) && setRefresh();
	
	let setRefresh = async()=> {
		$refresh = true;
		await tick();
		return new Promise( resolve => {
			$refresh = false;
			animAssets[headerType].cercles.forEach(c => initCercle(c))
			tick().then( _ => {
			resolve(svgs.forEach(s => s && s.beginElement()))
			}
		)});
	}
	let svgs = [];
	
	onMount( async() => {
		isMobile = isMobileDevice();
		$refresh = false;
		for (let cercle of animAssets[headerType].cercles ) {
			cercle.peri = Math.ceil(Math.PI * 2 * cercle.rayon);
			if (cercle.peri > 8000) 
				cercle.tiret *= 2;
			initCercle(cercle)
		}
		svgs.forEach(s => { s.beginElement()});
	});

	async function initCercle(cercle) {
			//const currCercle = document.querySelector(`#circle${cercle.id}`);
			if (cercle.el) {
				cercle.el.style.animation = 'none';
				await tick();
				setTimeout(function() {
					cercle.el.style.animation = '';
				}, 10);
				//cercle.stroke = Array(Math.ceil(cercle.peri  / (cercle.tiret ? cercle.tiret : 5 ))).fill(cercle.tiret ? cercle.tiret : 5)
				cercle.stroke = Array.from(
					{length:Math.ceil(cercle.peri  / ((cercle.tiret || 5) * 1.5 ))},
					()=> (Math.random()%2 === 0 ? cercle.tiret : cercle.tiret * 2)
				);
				if (cercle.stroke.length % 2 !== 0) 
					cercle.stroke.pop();
				cercle.el.style.stroke = animAssets[headerType].options.linesColor;		
				cercle.stroke = ([...cercle.stroke, 0, cercle.peri]).join(' ');
				cercle.el.style.strokeDasharray = cercle.stroke
				cercle.el.style.strokeDashoffset = cercle.peri
				cercle.el.style.transform = `rotateZ(${cercle.rotation || Math.round(Math.random()*365)})`;
				await tick();
			}
	}

	let restartLine = async (index) => {
		return new Promise( resolve => {
			resolve(svgs[index].beginElement());
		});
	}
</script>
<div class="svg-container">
    <div class="logo-container">
		{#if animAssets[headerType].options.sigleType === 'plain'}
			<img src="./img/logo.png" class="mb-5 logo-edra" alt="logo edra" style="margin-top:{isMobile ? "3em" : "0.75em"};">
		{:else if animAssets[headerType].options.sigleType === 'pointilles'}
			<img src="./img/sigle_pointilles.png" class="mb-5" alt="logo edra" width="74px" style="margin-top:{isMobile ? "3em" : "0.75em"};">
		{:else if animAssets[headerType].options.sigleType === 'concept'}
			<img src="./img/sigle-blanc.png" class="mb-5" alt="logo edra" width="74px" style="margin-top:{isMobile ? "3em" : "0.75em"};">
		{/if}
	{#if animAssets[headerType].options.title}
		<h1 class="title is-3 has-text-weight-bold mb-4" 
			style="color:{animAssets[headerType].options.linesColor};text-transform:uppercase;letter-spacing:0.25rem;">
			{animAssets[headerType].options.title}
		</h1>
	{/if}
    </div>

	{#if !$refresh}
	<svg height={isMobile ? "600" : "820"} width={isMobile ? "823" : "720"} id="svg" xmlns="http://www.w3.org/2000/svg"  
	preserveAspectRatio={isMobile ? "none" : "xMidYMid slice"}
	style="{isMobile ? '' :  'transform : rotateX(45deg);'} background:{animAssets[headerType].options.bgColor}"
	viewBox="0 0 1344 1079"
	version="1.1">

		{#each animAssets[headerType].cercles as cercle, index (cercle.id)}
			{#if !isMobile || (isMobile && !cercle.isHiddenMobile) }
					<circle bind:this={cercle.el}
						id="circle{cercle.id}" 
						class="cercle"
						cy={cercle.y}
						cx={cercle.x}
						r={cercle.rayon}
						stroke={animAssets[headerType].options.bgColor}
					>
					</circle>
			{/if}
		{/each}

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
		display:flex;
		flex-flow:column;
		justify-content: center;
		align-items: center;
		max-width:100vw;
		position:relative;
		z-index:9;
		top:41%;
	}
	
	#svg {
		position:absolute;
		left:0;
		top:0;
		width:100%;
		min-height:100%;
	}
	.cercle {
		fill:none;
		stroke-width:1;
		animation: cerclanim 7s linear infinite alternate-reverse;
	}

	@keyframes cerclanim {
		to {
			stroke-dashoffset: 0;
		}
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
		#svg {
			left:-99%;
		}
		.svg-container {
			height: calc(100vh + 768px);
			max-height:101vh;
		}
		.logo-container img {
			height:auto;
			width:8vmax;
		}
	}
</style>