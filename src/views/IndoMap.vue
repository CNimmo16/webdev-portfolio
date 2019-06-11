<template>
	<div id="map">
		<h1>Interactive Indonesia</h1>
		<div class="intro">
			A Javascript (and LeafletJS) based fully explorable map of Indonesia created for the tripthedistance.com travel blog. Use the mouse to interact with the map.
		</div>
		
		<div id="indofull">
			<button onclick="openFullscreen()"><i class="fas fa-expand"></i><span id="fsinfo">Click here to view the map fullscreen</span></button>
			<div id="mapoverlay">
				<div id="island-info-box">
					<div class="data-flow"></div>
					<h2 class="info-header">Island Name</h2>
					<div class="preview-image-container"></div>
					<div class="preview-text-container"></div>
					<h3 class="best-of"></h3>
					<div id="place-list"></div>
					
					<div id="place-info-box">
						<div class="data-flow"></div>
						<h2 class="info-header">Island Name</h2>
						<div class="preview-image-container"></div>
						<div class="preview-text-container"></div>
							
						<button class="back button"><img src="@/assets/ui-icons/left-chevron.svg">Back to overview</button>
						<button class="read button">Read full article<img src="@/assets/ui-icons/right-chevron.svg"></button>
					</div>
				</div>
		
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "IndoMap",
		mounted() {
			var L = require("leaflet")
			
			// Initialise map baselayer
			var bounds = [[0,0], [1917,2500]];
			var overviewBounds = [[443,482], [1200, 1544]];
			var map = L.map('indofull', {
				crs: L.CRS.Simple,
				minZoom: -4,
				zoomControl:false,
				zoomSnap: 0.0001,
				zoomDelta: 0.5,
				maxBoundsViscosity: 1.0,
				maxBounds: bounds,
				dragging: false,
				boxZoom: false,
				touchZoom: false,
				doubleClickZoom: false,
				scrollWheelZoom: false,
				keyboard: false
			});
			
			// eslint-disable-next-line
			var image = L.imageOverlay(require("@/assets/projects/indomap/baselayer.webp"), bounds).addTo(map);
			
			// Create variables to keep track of current map state
			var zoomed = null;
			var mouseoverPin = false;
			var mouseoverBox = false;
			var currentFocus = {
				island: null,
				place: null
			}
				
			// Scale map to chosen bounds when page loads
			map.fitBounds(overviewBounds);
			
			// Create templates for map pin icons
			var mainSvg = '<svg class="svg1" xmlns="http://www.w3.org/2000/svg" width="20px" height="32px" viewBox="0 0 205 305"> <path class="path1" fill="rgb(235, 248, 233)" stroke="black" stroke-width="10" d="M 102.81,5.97 C 156.38,5.97 199.81,49.40 199.81,102.97 199.81,118.02 196.38,132.26 190.27,144.97 190.27,144.97 110.98,300.50 104.50,300.28 98.81,300.09 23.48,160.18 23.48,160.18 14.81,144.97 5.81,124.37 5.81,102.97 5.81,49.40 49.24,5.97 102.81,5.97 102.81,5.97 102.81,5.97 102.81,5.97 Z M 139.81,100.30 C 139.81,79.87 123.25,63.30 102.81,63.30 82.38,63.30 65.81,79.87 65.81,100.30 65.81,120.74 82.38,137.30 102.81,137.30 123.25,137.30 139.81,120.74 139.81,100.30 Z" /> </svg>'
			var bigSvg = '<svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="25px" height="40px" viewBox="0 0 205 305"> <path class="path2" fill="rgb(235, 248, 233)" stroke="black" stroke-width="10" d="M 102.81,5.97 C 156.38,5.97 199.81,49.40 199.81,102.97 199.81,118.02 196.38,132.26 190.27,144.97 190.27,144.97 110.98,300.50 104.50,300.28 98.81,300.09 23.48,160.18 23.48,160.18 14.81,144.97 5.81,124.37 5.81,102.97 5.81,49.40 49.24,5.97 102.81,5.97 102.81,5.97 102.81,5.97 102.81,5.97 Z M 139.81,100.30 C 139.81,79.87 123.25,63.30 102.81,63.30 82.38,63.30 65.81,79.87 65.81,100.30 65.81,120.74 82.38,137.30 102.81,137.30 123.25,137.30 139.81,120.74 139.81,100.30 Z" /> </svg>'
			var mainIcon = L.divIcon({
				html: mainSvg,
				iconSize: [10, 20],
				iconAnchor: [11, 30] 
			})
			var bigIcon = L.divIcon({
				html: bigSvg,
				iconSize: [24, 38],
				iconAnchor: [13, 38] 
			})

			var islands = require("@/assets/projects/indomap/mapData.json");
			
			// Draw polygons for each island and save to island objects
			islands.forEach(function(island){
				// draw island shape from nodes in json
				island.shape = L.polygon(island.nodes).addTo(map);
				setIslandMouseoffStyle(island);
			})
			
			// Event handlers for islands
			islands.forEach(function(island){
				// when mouseover highlight border and show popup
					island.shape.on('mouseover', function(){
							if(zoomed === null) {
								island.popup = L.popup({
									closeButton: false,
									className: island.name.toLowerCase(),
								}).setContent(island.name).setLatLng(island.centerPosition).openOn(map);
								setIslandMouseoverStyle(island);
							}
					});
				// when mouseout remove highlight and hide popup
					island.shape.on('mouseout', function(){
						if(island.popup) {
							island.popup.remove();
						}
						setIslandMouseoffStyle(island);
					});
				// when clicked fit bounds and show markers
					island.shape.on('click', function(){
						if(currentFocus.island !== island.name) {
							islands.map(setIslandMouseoffStyle);
							zoomed = island.name;
							// zoom view area into island
							SetViewArea(island.viewBounds);
							// show places markers
							setTimeout(showMarkers(island), 500);
							// show the info box and set content based on islands array
							setFocus(island, null);
							
							// const outerBox = [[0,0], [0,2500], [1917,2500], [1917,0]]
							// island.shape = L.polygon([outerBox, island.nodes]).addTo(map);
							window.setTimeout(() => {
								setIslandZoomedStyle(island)
							}, 500)
							
							// animateInfoBox(island);
						} else if(currentFocus.island == island.name) {
							setFocus(false, null);
						}
					});
			});
			
			// Create markers and popup boxes for each place on each island, include event handler to open popup on mouseover
			islands.forEach(function(island) {
				island.places.forEach(function(place){
					// create pin for each place
					place.pin = L.marker(place.yx, {icon: mainIcon});
					// create popup box for each place, set content based on preview content from islands array
					place.box = L.popup({minWidth: 100, maxWidth: 200})
						.setLatLng(place.yx)
						.setContent(place.name);
					// open popup box when pin is moused over
					place.pin.on('mouseover', function(){
						if(mouseoverPin === false) {
							var nameFormatted = place.name.replace(/\s+/g, '').toLowerCase();
							document.querySelectorAll("[data-place='" + nameFormatted + "']")[0].classList.add("hover");
							// place.box.openOn(map);
							mouseoverPin = true;
							// place.pin.setIcon(bigIcon)
						}
					});
					// show info in panel on pin click
					place.pin.on('click', function(){
						if(island === currentFocus.island) {
							setFocus(false, place)
							this.$anime({
								targets: ".place-info-box",
								keyframes: [
									{opacity: 1},
									{opacity: 0},
								],
								duration: 1000,
								easing: "easeInCubic"
							})
						} else {
							setFocus(island, place)
						}
					});
				});
			});
			
			// Handle click on map out of islands - hide info box and zoom out
			map.on('click', function(){
				if(mouseoverPin === false && mouseoverBox === false) {
					map.fitBounds(overviewBounds);
					hideMarkers();
					zoomed = null;
					// Hide info box when map
					setFocus(null, null);
					islands.map(setIslandMouseoffStyle);
				}
			});
			
			// close popup on mouseoff from pin
			document.getElementById("indofull").addEventListener("mousemove", function(event) {
				if(!(event.target.classList.contains("svg1") || event.target.classList.contains("path1"))) {
					islands.forEach((island) => {
						island.places.forEach((place) => {
							place.box.remove();
							var nameFormatted = place.name.replace(/\s+/g, '').toLowerCase();
							var marker = document.querySelectorAll("[data-place='" + nameFormatted + "']");
							if(marker.length > 0) {
								marker[0].classList.remove("hover");
							}
							mouseoverPin = false;
						});
					});
				}
			});
			
			window.addEventListener('resize', function(){
				setTimeout(function() {
					map.fitBounds(overviewBounds, {animate: false});
					document.querySelectorAll("#indofull").innerHeight = window.innerHeight;
					map.invalidateSize()
				}, 20);
			}, true);
			
			document.getElementById("island-info-box").addEventListener('mouseover', function(){
				mouseoverBox = true;
			});
			document.getElementById("place-info-box").addEventListener('mouseover', function(){
				mouseoverBox = true;
			});
			document.getElementById("island-info-box").addEventListener('mouseout', function(){
				mouseoverBox = false;
			});
			document.getElementById("island-info-box").addEventListener('mouseout', function(){
				mouseoverBox = false;
			});
			
			document.querySelector("#indofull .back").addEventListener("click", function() {
				setFocus(false, null)
			});
				
			function updateItemHandlers() {
				for(var i=0; i<document.getElementsByClassName("placeItem").length; i++) {
					var oldElement = document.getElementsByClassName("placeItem")[i]
					var newElement = oldElement.cloneNode(true);
					oldElement.parentNode.replaceChild(newElement, oldElement);
				}
				for(var j=0; j<document.getElementsByClassName("placeItem").length; j++) {
					document.getElementsByClassName("placeItem")[j].addEventListener("mouseover", function() {
						var eventedIsland = this.getAttribute("data-island");
						var eventedPlace = this.getAttribute("data-place");
						
						var i = islands.findIndex((island) => island.name.replace(/\s+/g, '').toLowerCase() === eventedIsland);
						var p = islands[i].places.findIndex((place) => place.name.replace(/\s+/g, '').toLowerCase() === eventedPlace);
						islands[i].places[p].pin.setIcon(bigIcon);
					})
				}
				for(var h=0; h<document.getElementsByClassName("placeItem").length; h++) {
					document.getElementsByClassName("placeItem")[h].addEventListener("mouseout", function() {
						var eventedIsland = this.getAttribute("data-island");
						var eventedPlace = this.getAttribute("data-place");
						
						var i = islands.findIndex((island) => island.name.replace(/\s+/g, '').toLowerCase() === eventedIsland);
						var p = islands[i].places.findIndex((place) => place.name.replace(/\s+/g, '').toLowerCase() === eventedPlace);
						islands[i].places[p].pin.setIcon(mainIcon);
					})
				}
				for(var k=0; k<document.getElementsByClassName("placeItem").length; k++) {
					document.getElementsByClassName("placeItem")[k].addEventListener("click", function() {
					var eventedIsland = this.getAttribute("data-island");
					var eventedPlace = this.getAttribute("data-place");
					var island = islands.find((island) => island.name.replace(/\s+/g, '').toLowerCase() === eventedIsland);
					var place = island.places.find((place) => place.name.replace(/\s+/g, '').toLowerCase() === eventedPlace);
					setFocus(island, place);
					});
				}
			}
				
			function setIslandMouseoffStyle(island) {
				if(currentFocus.island !== island) {
					var mouseoffPolygonStyle = {color: island.outlineColor, dashArray: 0, weight: 1.5, fillColor: island.outlineColor, fillOpacity: 0.4, bubblingMouseEvents: false};
					island.shape.setStyle(mouseoffPolygonStyle);
				}
			}
			
			function setIslandMouseoverStyle(island) {
				if(currentFocus.island !== island) {
					var mouseoverPolygonStyle = {color: "#eedecd", dashArray: 0, weight: 2.5, fillColor: island.outlineColor, fillOpacity: 0, bubblingMouseEvents: false}
					island.shape.setStyle(mouseoverPolygonStyle);
				}
			}
			
			function setIslandZoomedStyle(island) {
				var islandZoomedStyle = {color: island.outlineColor, dashArray: 0, weight: 2.5, fillColor: island.color, fillOpacity: 0, bubblingMouseEvents: false}
				island.shape.setStyle(islandZoomedStyle);
			}
			
			function hideMarkers() {
				islands.forEach(function(island) {
					island.places.forEach(function(place) {
						place.pin.remove();
					});
				});
			}
			
			// Function to display all marker pins for a certain island
			function showMarkers(island) {
				island.places.forEach(function(place){
					place.pin.addTo(map);
				});
			}
			
			function setFocus(island, place) {
				if(island !== false) {
					currentFocus.island = island;
				}
				if(place !== false) {
					currentFocus.place = place;
				}
				infoBoxesFromFocus();
			}
			
			function infoBoxesFromFocus() {
				if(currentFocus.island) {
					populateIslandBox({island: currentFocus.island});
					document.getElementById('island-info-box').classList.add("showBox");
					if(currentFocus.place) {
						populatePlaceBox({island: currentFocus.island, place: currentFocus.place});
						document.getElementById('place-info-box').classList.add("showBox");
					} else {
						document.getElementById('place-info-box').classList.remove("showBox");
					}
				} else {
					document.getElementById('island-info-box').classList.remove("showBox");
				}
			}
			
			// Populate info box using data from islands array
			function populateIslandBox(locationData) {
				var location = locationData.island;
				
				populateSharedInfo(locationData.island, 0);
			
				document.getElementsByClassName("data-flow")[0].innerHTML = '<span class="data">Islands</span><i class="fas fa-angle-right"></i><span class="active data">' + location.name + '</span>'
				document.getElementsByClassName('preview-image-container')[0].innerHTML = '<img class="ui centered rounded image" src="/mapImages/islands/' + location.name.toLowerCase() + '.jpg">';
				document.getElementsByClassName('best-of')[0].innerText = "Explore " + location.name;
				
				document.getElementById('place-list').innerHTML = "";
				location.places.forEach(function(place) {
					var box = document.createElement("div");
					var placeFormatted = place.name.replace(/\s+/g, '').toLowerCase();
					var islandFormatted = locationData.island.name.replace(/\s+/g, '').toLowerCase();
					box.classList.add("placeItem");
					box.setAttribute("data-place", placeFormatted);
					box.setAttribute("data-island", islandFormatted);
					box.innerHTML = "<img src='/mapImages/places/icons/" + place.icon + ".svg'><p>" + place.name + "</p>"
					document.getElementById('place-list').appendChild(box);
				});
				
				document.getElementById('island-info-box').style.display = "block";
				updateItemHandlers()
			}
			
			function populatePlaceBox(locationData) {
				populateSharedInfo(locationData.place, 1);
				document.getElementsByClassName("data-flow")[1].innerHTML = '<span class="data">Islands</span><i class="fas fa-angle-right"></i><span class="data">' + locationData.island.name + '</span><i class="fas fa-angle-right"></i><span class="active data">' + locationData.place.name + '</span>'
				document.getElementsByClassName('preview-image-container')[1].innerHTML = '<img class="ui centered rounded image" src="/mapImages/places/' + locationData.place.name.toLowerCase() + '.jpg">';
				document.getElementById('place-info-box').style.display = "block";
				updateItemHandlers()
			}
			
			function populateSharedInfo(location, i) {
				document.getElementsByClassName('info-header')[i].innerHTML = location.name;
				var previewText = createPreviewText(location.summary);
				document.getElementsByClassName('preview-text-container')[i].innerHTML = previewText;
				// document.getElementById("island-info-box").style.boxShadow = "0 0 0 1px " + location.color + " inset, 3px 3px " + location.color;
				document.getElementsByClassName("data-flow")[i].style.color = location.color;
			}
			
			// Function to limit text length when displaying preview box
			function createPreviewText(fullText) {
				var charLimit = 50;
				var docWidth = window.innerWidth;
				if(docWidth <= 400) {
					charLimit = 50;
				} else if(docWidth > 800 && docWidth <= 1500) {
					charLimit = 100;
				} else if(docWidth > 1500) {
					charLimit = 250;
				} else {
					charLimit = 100;
				}
				if(fullText.length > charLimit) {
					var shortText = fullText.toString().substring(0, charLimit);
					var cutPoint = shortText.lastIndexOf(" ");
					shortText = shortText.substring(0, cutPoint) + "...";
				} else {
					shortText = fullText;
				}
				return shortText;
			}
			
				// Function to set view area to passed bounds
			function SetViewArea(bounds) {
				map.flyToBounds(bounds, {
					easeLinearity: 1,
					duration: 0.5
				})
			}
		}
	}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Inconsolata|Crimson+Text|Poppins');

#map {
	margin: 0 auto;
	width: 90%;
	@include mq("large-monitor") {
		width: 75%;
	}
	position: relative;
	h1 {
		margin: 0;
		padding-top: 110px;
		padding-bottom: 15px;
		text-align: center;
		@extend %font-slabo;
		font-size: 2.7em;
	}
	.intro {
		padding-bottom: 25px;
	}
}

h3.itinerary{
		margin-bottom: 30px;
		width: 100%;
		font-family: "bebas_neuebook", Arial, sans-serif;
		font-size: 2rem;
		font-weight: 500;
		text-align: left;
		letter-spacing: 3px;
		word-wrap: break-word;
		color: black;
}

#indofull {
	padding-top: 45%;
	margin: 0 auto;
	border-radius: 5px;
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	@include mq("small-monitor", "max") {
		height: 10vw;
	}
	@include mq("large-phone", "max") {
		height: 80vw;
	}
	font-size: 1.2rem;
	background-color: #f9f9f9;
	box-shadow: 4px 4px 18px 0px rgba(0, 0, 0, 0.07);
	.svg1 {
		&:hover {
			transform: scale(1.2) translateY(-2px);
		}
	}
	> button {
		position: absolute;
		z-index: 2000;
		bottom: 14px;
		right: 14px;
		width: 50px;
		font-size: 30px;
		color: white;
		border: none;
		background-color: transparent;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.3s;
		&:hover {
			transform: scale(1.2);
		}
		> span {
			position: absolute;
			opacity: 0;
			transition: opacity 2s;
			font-size: 15px;
			color: black;
			border-radius: 5px;
			bottom: 30px;
			right: 20px;
			width: 100px;
			background-color: #ffffc8;
			&.show {
				opacity: 1;
			}
		}
	}
}

#mapoverlay {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 3000;
		height: 100%;
		left: 0;
		bottom: 0;
		pointer-events: none;
}

#island-info-box {
	position: relative;
}

#place-info-box {
	position: absolute;
}

#island-info-box, #place-info-box {
	overflow-y: scroll;
	pointer-events: auto;
	display: block;
	float: right;
	text-align: center;
	top: 0;
	left: 0;
	width: 405px;
	max-width: 100%;
	padding: 14px 22px;
	box-shadow: 3px -5px 10px -3px rgba(0,0,0,0.3);
	border-radius: 0px;
	
	min-height: calc(100% - 28px);
	display: block;
	transform: translateX(110%);
	transition: transform 1s ease;
	&.showBox {
		transform: translateX(0);
	}
	.data-flow {
		position: relative;
		width: 100%;
		text-align: left;
		font-size: 0.9em;
		margin: 2px 3px 2px 3px;
		font-family: "Inconsolata";
		font-weight: 300;
		text-transform: capitalize;
		.active {
			font-weight: 600;
		}
		i {
			font-size: 0.85em;
			margin: 0 0.4em;
		}
	}
	h2.info-header {
		margin: 0;
		padding: 1px;
		font-size: 1.8em;
		font-family: "Crimson Text";
		font-weight: 400;
		letter-spacing: 3px;
		text-align: center;
		text-transform: capitalize;
		position: relative;
		width: fit-content;
		margin: 7px auto;
		&::after {
			position: absolute;
			content: "";
			top: 95%;
			left: -10px;
			right: -10px;
			border-bottom: 1px solid #333;
		}
	}
	.preview-image-container {
		display: none;
		@include mq("small-monitor") {
			display: block;
		}
		margin: 15px 0 20px 0;
		img {
			width: 100%;
			height: 170px;
			object-fit: cover
		}
	}
	.preview-text-container {
		padding: 0 2%;
		font-family: "Crimson Text";
		text-align: left;
	}
}

#island-info-box {
	z-index: 200;
	// margin: 10px 15px;
	right: 0;
	background-color: rgb(255,255,255);
	box-shadow: -2px 0px 3px rgba(1,1,1,0.4);
	// background-color: rgba(255,255,255, 0.95);
	max-height: 100%;
	h3 {
		margin: 20px auto 10px auto;
		text-align: center;
		font-family: "Inconsolata", sans-serif;
		font-size: 1.18em;
		letter-spacing: 1px;
		font-weight: 200;
		position: relative;
		width: fit-content;
		&::after {
			position: absolute;
			content: "";
			top: 100%;
			left: -10px;
			right: -10px;
			border-bottom: 1px solid #333;
		}
	}
	#place-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		.placeItem {
			display: flex;
			align-items: center;
			padding: 0px 8px;
			margin: 10px 0;
			height: 55px;
			border-radius: 6px;
			cursor: pointer;
			transition: color 0.3s;
			img {
				margin: auto 0;
				height: 50px;
				min-width: 45px;
				width: 45px;
				object-fit: contain;
			}
			p {
				font-family: "Inconsolata";
				font-weight: 500;
				text-transform: capitalize;
				letter-spacing: 1px;
				font-size: 1em;
				line-height: 1.1em;
				margin: 0 10px;
				text-align: left;
				transition: all 0.3s;
			}
			&.hover, &:hover {
				p {
					color: #9ca558;
					font-size: 1.1em;
				}
			}
		}
	}
}

#place-info-box {
	left: 0;
	z-index: 300;
	margin: 0px 0 0 10px;
	background-color: rgb(255,255,255);
	// background-color: rgba(255,255,255, 0.95);
	box-shadow: -2px 0px 3px rgba(1,1,1,0.4);
	min-height: calc(100% - 10px);
	button {
		float: left;
		margin: 25px 5px 5px 5px;
		background-color: #f3f3f3;
		&:nth-of-type(2) {
			float: right;
		}
		> i {
			margin-left: 10px;
		}
	}
	.preview-image-container {
		display: block !important;
	}
}

.leaflet-popup-pane {
	margin: 0;
	pointer-events: none;
	
}

.leaflet-div-icon {
	background: transparent;
	border: none;
}

.leaflet-popup-content-wrapper {
	width: auto;
	min-width: 80px;
	background: white;
	border-left: 5px solid #e0c473;
	/*opacity: 0.9;*/
	/*box-shadow: rgb(0, 0, 0) 0px 0px 0px 1px inset, */
	/*            rgb(0, 0, 0) 2px 2px;*/
	/*border: 3px solid white;*/
	border-radius: 2px;
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
}

.sumatra .leaflet-popup-content-wrapper {
	border-left-color: #879ebf;
}
.java .leaflet-popup-content-wrapper {
	border-left-color: #a9a260;
}
.bali .leaflet-popup-content-wrapper {
	border-left-color: #e6c96e;
}
.lombok .leaflet-popup-content-wrapper {
	border-left-color: #d6a873;
}
.flores .leaflet-popup-content-wrapper {
	border-left-color: #aa7575;
}
.banda .leaflet-popup-content-wrapper {
	border-left-color: #aa7575;
}
	
.leaflet-popup-content {
	height: 45px;
	line-height: 40px;
	margin: 0 30px;
	font-family: "Crimson Text", serif;
	font-size: 1.6em;
	color: #000000;
	text-align: center;
}

.leaflet-popup-tip-container {
	width:40px;
	height:50px;
}

.leaflet-popup-tip {
	background: white;
	/*box-shadow: 3px 3px 10px 0px black;*/
	/*box-shadow: rgb(135, 158, 191) 0px 0px 0px 1px inset, */
	/*            rgb(135, 158, 191) 2px 2px;*/
	border: 1px solid rgb(0, 0, 0);
	/*border-left:15px solid transparent;*/
	/*border-right:15px solid transparent;*/
	/*border-top:15px solid #2c3e50;*/
	}

.leaflet-control-attribution {
	display: none;
}

.button {
	outline: none;
	border: none;
	border-left: 5px solid #e0c473;
	border-radius: 0px;
	padding: 7px 15px 7px 5px;
	&:nth-of-type(2) {
		padding: 7px 5px 7px 15px;
	}
	cursor: pointer;
	position: relative;
	color: #555;
	font-family: "Poppins", sans-serif;
	font-size: 15px;
	transition: transform 0.2s;
	display: flex;
	align-items: center;
	img {
		height: 30px;
		width: 30px;
	}
	&::after {
		content: "";
		position: absolute;
		width: calc(100% + 5px);
		height: 100%;
		left: -5px;
		top: 0;
		border-radius: 2px;
		box-shadow: 2px 5px 5px -3px rgba(0, 0, 0, 0.3);
		opacity: 0.3;
		transition: opacity 0.5s;
	}
	&:hover {
		color: #222;
		transform: scale(1.02);
		&::after{
			opacity: 1;
		}
	}
}
</style>