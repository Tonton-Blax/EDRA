<script>
	import { draw } from 'svelte/transition';
	export let bgColor = "#005476";
	export let linesColor = "white";
	export let siglePointilles = false;
	export let title = undefined;

</script>

<div class="svg-container">
    <div class="logo-container">
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
		<img src="./img/logo.png" class="mb-5" alt="logo edra">
	{/if}
	{#if title && title.subTitle}
		<h1 class="title is-2 has-text-weight-bold mb-4" style="color:{linesColor};text-transform:uppercase">{title.title}</h1>
		<h3 class="title is-5 has-text-weight-normal is-subtitle" style="color:{linesColor};">{title.subTitle || ""}</h3>
	{/if}
    </div>

	<svg height="820" width="720" id="svg" style="background:{bgColor}">
		<defs>
			<marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
				<path d="M0,0 L0,6 L9,3 z" fill={linesColor} opacity="0">
					<animate attributeType="XML" attributeName="opacity" from="0" to="1" dur=".1s" repeatCount="0" fill="freeze" />
				</path>
			</marker>

		</defs>
				<line id="line0" stroke-dasharray="3" x1="550" y1="0" x2="551" y2="1" stroke={linesColor} stroke-width="2" marker-end="url(#arrow)">
				<animate id="l0anim1" attributeType="XML" attributeName="x2" from="551" to="1350" dur="10s" fill="freeze" />
				<animate id="l0anim2" attributeType="XML" attributeName="y2" from="1" to="820" dur="10s" fill="freeze"/>
				<animate id="l0anim3" begin="l0anim1.end" attributeType="XML" attributeName="x1" from="551" to="1350" dur="10s"fill="freeze" />
				<animate id="l0anim4" begin="l0anim2.end" attributeType="XML" attributeName="y1" from="1" to="820" dur="10s" fill="freeze" />
		</line>

		<line id="line1" stroke-dasharray="3" x1="60" y1="0" x2="61" y2="1150" stroke={linesColor} stroke-width="1" marker-end="url(#arrow)">
			<animate attributeType="XML" attributeName="x2" from="61" to="1150" dur="10s" fill="freeze" id="anim1" />
			<animate attributeType="XML" attributeName="y2" from="1" to="1150" dur="10s" fill="freeze" id="anim2" />
			
			<animate attributeType="XML" attributeName="x1" from="60" to="1150" dur="10s" fill="freeze" id="anim3" begin="anim1.end"/>
			<animate attributeType="XML" attributeName="y1" from="0" to="1150" dur="10s" fill="freeze" id="anim4" begin="anim2.end"/>
		</line>
		
		<line id="line2" stroke-dasharray="3" x1="00" y1="625" x2="1" y2="1" stroke={linesColor} stroke-width="1" marker-end="url(#arrow)">
				<animate id="l2anim1" attributeType="XML" attributeName="x2" from="1" to="820" dur="7s" fill="freeze" />
				<animate id="l2anim2" attributeType="XML" attributeName="y2" from="625" to="-5" dur="7s" fill="freeze" />
				<animate id="l2anim3" begin="l2anim1.end" attributeType="XML" attributeName="x1" from="0" to="820" dur="7s" fill="freeze" />
				<animate id="l2anim4" begin="l2anim2.end"attributeType="XML" attributeName="y1" from="625" to="1" dur="7s" fill="freeze" />
		</line>
		
		<line id="line3" stroke-dasharray="3" x1="-1" y1="925" x2="0" y2="1" stroke={linesColor} stroke-width="4" marker-end="url(#arrow)">
				<animate id="l3anim1" attributeType="XML" attributeName="x2" from="0" to="1150" dur="10s" fill="freeze"/>
				<animate id="l3anim2" attributeType="XML" attributeName="y2" from="925" to="1" dur="10s" fill="freeze"/>
				<animate id="l3anim3" begin="l3anim1.end" attributeType="XML" attributeName="x1" from="0" to="1150" dur="10s" fill="freeze" />
				<animate id="l3anim4" begin="l3anim2.end" attributeType="XML" attributeName="y1" from="925" to="1" dur="10s" fill="freeze" />
		</line>
		
		<line id="line4" stroke-dasharray="3" x1="565" y1="1100" x2="551" y2="826" stroke={linesColor} stroke-width="2" marker-end="url(#arrow)">
				<animate id="l4anim1" begin="0s" attributeType="XML" attributeName="x2" from="565" to="-200" dur="10s" fill="freeze" />
				<animate id="l4anim2" begin="0s" attributeType="XML" attributeName="y2" from="1100" to="237" dur="10s" fill="freeze"/>
				<animate id="l4anim3" begin="l4anim1.end" attributeType="XML" attributeName="x1" from="565" to="-200" dur="10s" fill="freeze"/>
				<animate id="l4anim4" begin="l4anim2.end" attributeType="XML" attributeName="y1" from="1100" to="237" dur="10s" fill="freeze"/>
		</line>
		
		<line id="line5" stroke-dasharray="3" x1="1351" y1="273" x2="-200" y2="274" stroke={linesColor} stroke-width="1" marker-end="url(#arrow)">
			<animate id="l5anim1" attributeType="XML" attributeName="x2" from="1351" to="-200" dur="10s" fill="freeze"/>
			<animate id="l5anim2" attributeType="XML" attributeName="y2" from="274" to="1645" dur="10s" fill="freeze" />
			<animate id="l5anim3" begin="l5anim1.end" attributeType="XML" attributeName="x1" from="1351" to="-200" dur="10s" fill="freeze" />
			<animate id="l5anim4" begin="l5anim2.end" attributeType="XML" attributeName="y1" from="274" to="1645" dur="10s" fill="freeze" />
				
		</line>
			<circle class="circle-path" cy="310" cx="20" r="240" stroke={linesColor} opacity="1">
				<animate id="canim1" attributeType="XML" attributeName="opacity" from="1" to="0" dur="2s" begin="9s" fill="freeze"/>
			</circle>
		 	<circle class="circle-path delay" cy="410" cx="809" r="100" stroke={linesColor} >
				<animate id="canim2" attributeType="XML" attributeName="opacity" from="1" to="0" dur="2s" begin="10s" fill="freeze"/>
			</circle>
	</svg>
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
		transform: translate(-50%, -50%);
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
	.delay {
		animation-delay : 3s
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