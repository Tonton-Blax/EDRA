<div class="svg-container">
    <div class="logo-container">
        <img src="https://i.imgur.com/oXQW56S.png" alt="logo edra">
    </div>

	<svg height="820" width="720" id="svg">
		<defs>
			<marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
				<path d="M0,0 L0,6 L9,3 z" fill="white" opacity="0">
					<animate attributeType="XML" attributeName="opacity" from="0" to="1" dur=".1s" repeatCount="0" fill="freeze" />
				</path>
			</marker>

		</defs>
				<line id="line0" stroke-dasharray="3" x1="550" y1="0" x2="551" y2="1" stroke="white" stroke-width="2" marker-end="url(#arrow)">
				<animate id="l0anim1" attributeType="XML" attributeName="x2" from="551" to="1350" dur="10s" fill="freeze" />
				<animate id="l0anim2" attributeType="XML" attributeName="y2" from="1" to="820" dur="10s" fill="freeze"/>
				<animate id="l0anim3" begin="l0anim1.end" attributeType="XML" attributeName="x1" from="551" to="1350" dur="10s"fill="freeze" />
				<animate id="l0anim4" begin="l0anim2.end" attributeType="XML" attributeName="y1" from="1" to="820" dur="10s" fill="freeze" />
		</line>

		<line id="line1" stroke-dasharray="3" x1="60" y1="0" x2="61" y2="1150" stroke="white" stroke-width="1" marker-end="url(#arrow)">
			<animate attributeType="XML" attributeName="x2" from="61" to="1150" dur="10s" fill="freeze" id="anim1" />
			<animate attributeType="XML" attributeName="y2" from="1" to="1150" dur="10s" fill="freeze" id="anim2" />
			
			<animate attributeType="XML" attributeName="x1" from="60" to="1150" dur="10s" fill="freeze" id="anim3" begin="anim1.end"/>
			<animate attributeType="XML" attributeName="y1" from="0" to="1150" dur="10s" fill="freeze" id="anim4" begin="anim2.end"/>
		</line>
		
		<line id="line2" stroke-dasharray="3" x1="00" y1="625" x2="1" y2="1" stroke="white" stroke-width="1" marker-end="url(#arrow)">
				<animate id="l2anim1" attributeType="XML" attributeName="x2" from="1" to="820" dur="7s" fill="freeze" />
				<animate id="l2anim2" attributeType="XML" attributeName="y2" from="625" to="-5" dur="7s" fill="freeze" />
				<animate id="l2anim3" begin="l2anim1.end" attributeType="XML" attributeName="x1" from="0" to="820" dur="7s" fill="freeze" />
				<animate id="l2anim4" begin="l2anim2.end"attributeType="XML" attributeName="y1" from="625" to="1" dur="7s" fill="freeze" />
		</line>
		
		<line id="line3" stroke-dasharray="3" x1="-1" y1="925" x2="0" y2="1" stroke="white" stroke-width="4" marker-end="url(#arrow)">
				<animate id="l3anim1" attributeType="XML" attributeName="x2" from="0" to="1150" dur="10s" fill="freeze"/>
				<animate id="l3anim2" attributeType="XML" attributeName="y2" from="925" to="1" dur="10s" fill="freeze"/>
				<animate id="l3anim3" begin="l3anim1.end" attributeType="XML" attributeName="x1" from="0" to="1150" dur="10s" fill="freeze" />
				<animate id="l3anim4" begin="l3anim2.end" attributeType="XML" attributeName="y1" from="925" to="1" dur="10s" fill="freeze" />
		</line>
		
		<line id="line4" stroke-dasharray="3" x1="565" y1="1100" x2="551" y2="826" stroke="white" stroke-width="2" marker-end="url(#arrow)">
				<animate id="l4anim1" begin="0s" attributeType="XML" attributeName="x2" from="565" to="-200" dur="10s" fill="freeze" />
				<animate id="l4anim2" begin="0s" attributeType="XML" attributeName="y2" from="1100" to="237" dur="10s" fill="freeze"/>
				<animate id="l4anim3" begin="l4anim1.end" attributeType="XML" attributeName="x1" from="565" to="-200" dur="10s" fill="freeze"/>
				<animate id="l4anim4" begin="l4anim2.end" attributeType="XML" attributeName="y1" from="1100" to="237" dur="10s" fill="freeze"/>
		</line>
		
		<line id="line5" stroke-dasharray="3" x1="1351" y1="273" x2="-200" y2="274" stroke="white" stroke-width="1" marker-end="url(#arrow)">
			<animate id="l5anim1" attributeType="XML" attributeName="x2" from="1351" to="-200" dur="10s" fill="freeze"/>
			<animate id="l5anim2" attributeType="XML" attributeName="y2" from="274" to="1645" dur="10s" fill="freeze" />
			<animate id="l5anim3" begin="l5anim1.end" attributeType="XML" attributeName="x1" from="1351" to="-200" dur="10s" fill="freeze" />
			<animate id="l5anim4" begin="l5anim2.end" attributeType="XML" attributeName="y1" from="274" to="1645" dur="10s" fill="freeze" />
				
		</line>
			<circle class="circle-path" cy="310" cx="20" r="240"></circle>
		 	<circle class="circle-path delay" cy="410" cx="809" r="100"></circle>
		

	</svg>
</div>
<style>
	.svg-container {
		position:absolute;
		width:fill-available;
		height:1079px;
	}
	.logo-container {
		position:absolute;
		z-index:1;
		left:46%;
		top:48%;
	}
	#svg {
		position:absolute;
		left:0;
		top:0;
		width:100%;
		min-height:100%;
		background:#005476;
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
  	stroke: white;
  	fill: none;
	}
</style>