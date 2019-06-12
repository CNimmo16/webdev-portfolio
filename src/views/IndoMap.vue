<template>
	<section id="map" class="section section--light">
		<div class="section__content">
			<h1 class="title title--big">Interactive Indonesia</h1>
			<p>I developed this Javascript based, fully explorable map of Indonesia for the tripthedistance.com travel blog. The map is built on the popular LeafletJS library, but uses a static image for the baselayer, rather than a tiled map layer.</p>
			<!--<h2 class="title title-small">Give it a go</h2>-->
			<p>Explore the map below. </p>
			
			<div id="indofull">
				<button onclick="toggleFullscreen()" id="fullscreen-button"><i class="fas fa-expand"></i><i class="fas fa-compress"></i><span class="info" id="fsinfo">You can click here to view the map fullscreen</span></button>
				<div id="mapoverlay">
					<div id="island-info-box">
						<div class="data-flow"></div>
						<div class="left-col">
							<h2 class="info-header">Island Name</h2>
							<div class="preview-image-container island"></div>
						</div>
						<div class="right-col">
							<div class="preview-text-container"></div>
							<h3 class="best-of"></h3>
							<div id="place-list"></div>
							<div id="place-info-box">
								<div class="data-flow"></div>
								<div class="left-col">
									<h2 class="info-header">Island Name</h2>
									<div class="preview-image-container"></div>
								</div>
								<div class="right-col">
									<div class="preview-text-container"></div>
								</div>
								<div class="buttons">
									<button class="back button">Back to overview</button>
									<button class="read button">Read full article</button>
								</div>
							</div>
						</div>
						<div class="buttons">
							<button class="back-to-map button">Back to map</button>
						</div>
					</div>
			
				</div>
				<div class="full-screen-prompt show" onclick="openFullscreen()">Click here to launch the interactive map.</div>
				<div class="turn-landscape-prompt"><div class="info">For the best experience, please rotate your device into landscape mode.</div></div>
			</div>
			
			<h2 class="title title--small">Development challenges</h2>
			<p>In keeping with the site's travel aesthetic, the map was required to look "antique", like an explorer's map. While there are tiled raster baselayers available that aim to emulate the style of an old map, they a. don't provide the flexibility I wanted and b. just don't look that great.</p>
			<p>Instead, I chose to go with a very high resolution static image for the baselayer. This presented several challenges:</p>
			<ol>
				<li>Unlike a tiled map baselayer, which generally provides coverage of the entire world, a hand drawn map of course has boundaries. In order not to break the immersion, it was important to avoid showing the map's edges far as possible. This meant using leaflet's maximum bounds feature, combined with testing at different device resolutions to ensure the map worked well across devices.</li>
				<li>For the "hoverable" island shapes, publically available GeoJSON polygons could have been used on a MapBox or Google Maps baselayer, but due to this map being several centuries old, after testing I found that their edges didn't correctly align with the base map. To solve this, I traced the islands' outlines in Inkscape, and used a plugin to export the node coordinates, which I then used to create LeafletJS polygons.</li>
			</ol>
			<h2 class="title title--small">User Experience</h2>
			<p>The map's information overlay comprises two divs absolutely positioned on top of eachother. These are transitioned over/away from the map dependent on the currently focused location. There are two types of locations: islands and cities, and therefore two information boxes. I originally built the map with just one information box, dynamically changing content between islands and cities. However, I found that this made the user experience confusing. Introducing the two seperate divs with a card stacking effect helped to convey that cities are located within islands. I also added a simple breadcrumb to the top of the box to further improve navigational context. </p>

			<h2 class="title title--small">Making it mobile</h2>
			<p>Making an interactive map user friendly on mobile devices is difficult. There's a lot of content, and at any one point in time a lot of it is relevant to present to the user, which isn't easy to do with such a small viewport to work with.</p>
			<p>After testing I found that on mobile the map needed to be fullscreen to provide a good experience. I had already added fullscreen functionality to the desktop version, but added an overlay displayed only on mobile devices, prompting the user to click to "launch the map", which in fact just sends a fullscreen request to the browser.</p>
			<p>Due to time limitations, I decided to change only the styling on mobile devices. Instead of overlapping the right side of the map, the information overlay covers the entire map on mobile. Indonesia's long stretched out shape makes it difficult to present well in a portrait display. While the map does work in portrait, I added a toast notification which appears if the map is launched in portrait mode, or is rotated from landscape to portrait at any point. The toast recommends switching the device to landscape mode for the best experience. For content in landscape mode on mobile, I used a css grid layout to create two columns of text and images, allowing me to fit all the information from the desktop version into the mobile experience.</p>
			<p>I'm still not completely happy with user experience on mobile devices with the map. If I had time to improve it further, the ideal thing would be to replicate the way that Google Maps' mobile apps work: when an island is clicked, the map should zoom to fit the island on screen as it does on desktop currently. Then, clicking a map pin opens a mini info overlay at the bottom of the screen, which can be clicked to see full details. </p>
		</div>
	</section>
</template>

<script>
/* eslint-disable */


	const L = require("leaflet");

	export default {
		name: "IndoMap",
		mounted() {
			window.setTimeout(() => {
				document.getElementById("fsinfo").classList.add("show");
			}, 1000);
			window.setTimeout(() => {
				document.getElementById("fsinfo").classList.remove("show");
			}, 4500);
				
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
				dragging: true,
				boxZoom: false,
				touchZoom: true,
				doubleClickZoom: false,
				scrollWheelZoom: false,
				keyboard: false
			});
			
			var image = L.imageOverlay('/mapImages/baselayer.webp', bounds).addTo(map);
			
			var islands = [];
			
			// Create variables to keep track of current map state
			var zoomed = null;
			var mouseoverPin = false;
			var mouseoverBox = false;
			var currentFocus = {
				island: null,
				place: null
			}
			var isFullScreen = false;
				
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
							anime({
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
			map.on('click', () => {
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
			
			document.querySelector("#indofull .back-to-map").addEventListener("click", function() {
				setFocus(null, null)
			});
			
			document.getElementById("indofull").addEventListener("fullscreenchange", function() {
				document.getElementById("fullscreen-button").classList.toggle("isFullScreen")
				document.getElementsByClassName("full-screen-prompt")[0].classList.toggle("show")
			});
			
			function checkIfLandscape() {
				window.setTimeout(() => {
					if(window.matchMedia("(orientation: portrait)").matches && isFullScreen) {
						document.getElementsByClassName("turn-landscape-prompt")[0].classList.add("show")
						window.setTimeout(() => {
							document.getElementsByClassName("turn-landscape-prompt")[0].classList.remove("show")
						}, 4000)
					} else {
						document.getElementsByClassName("turn-landscape-prompt")[0].classList.remove("show")
					}
				}, 300)
			}
			
			window.addEventListener("orientationchange", checkIfLandscape)
			
			function toggleFullscreen() {
				if(isFullScreen) {
					closeFullscreen()
				} else {
					window.openFullscreen()
				}
			}
			
			window.openFullscreen = function() {
			    var map = document.getElementById("indofull");
			
			    if(map.requestFullscreen) {
			        map.requestFullscreen();
			    } else if (map.mozRequestFullScreen) { /* Firefox */
			        map.mozRequestFullScreen();
			    } else if (map.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			        map.webkitRequestFullscreen();
			    } else if (map.msRequestFullscreen) { /* IE/Edge */
			        map.msRequestFullscreen();
			    }
			    isFullScreen = true;
			    checkIfLandscape()
			}
			
			function closeFullscreen() {
				document.exitFullscreen();
				isFullScreen = false;
			}
				
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
				};
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
			};
			
			// Function to display all marker pins for a certain island
			function showMarkers(island) {
				island.places.forEach(function(place){
					place.pin.addTo(map);
				});
			};
			
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
			
				document.getElementsByClassName("data-flow")[0].innerHTML = '<span class="data">Islands</span><img src="/mapImages/right-chevron.svg"><span class="active data">' + location.name + '</span>'
				document.getElementsByClassName("data-flow")[0].style.color = locationData.island.color;
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
				
				// document.getElementById('island-info-box').style.display = "block";
				updateItemHandlers()
			}
			
			function populatePlaceBox(locationData) {
				populateSharedInfo(locationData.place, 1);
				document.getElementsByClassName("data-flow")[1].innerHTML = '<span class="data">Islands</span><img src="/mapImages/right-chevron.svg"><span class="data">' + locationData.island.name + '</span><img src="/mapImages/right-chevron.svg"><span class="active data">' + locationData.place.name + '</span>'
				document.getElementsByClassName("data-flow")[1].style.color = locationData.island.color;
				document.getElementsByClassName('preview-image-container')[1].innerHTML = '<img class="ui centered rounded image" src="/mapImages/places/' + locationData.place.name.toLowerCase() + '.jpg">';
				// document.getElementById('place-info-box').style.display = "block";
				updateItemHandlers()
			}
			
			function populateSharedInfo(location, i) {
				document.getElementsByClassName('info-header')[i].innerHTML = location.name;
				var previewText = createPreviewText(location.summary);
				document.getElementsByClassName('preview-text-container')[i].innerHTML = previewText;
				// document.getElementById("island-info-box").style.boxShadow = "0 0 0 1px " + location.color + " inset, 3px 3px " + location.color;
			}
			
			// Function to limit text length when displaying preview box
			function createPreviewText(fullText) {
				var charLimit = 280;
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
	p {
		text-align: left;
		margin: 5px 0 30px 0;
		padding: 0;
		font-weight: 300;
	}
	.title--small {
		padding-top: 20px;
	}
}

#map button.button {
  outline: none;
  border: none;
  border-left: 5px solid #e0c473;
  border-radius: 0;
  padding: 10px 16px;
  cursor: pointer;
  position: relative;
  color: #111 !important;
  font-family: "Poppins", sans-serif;
  font-size: 0.8em;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 5px);
    height: 100%;
    left: -5px;
    top: 0;
    /*border-radius: 2px;*/
    box-shadow: 2px 5px 5px -3px rgba(0, 0, 0, 0.3);
    opacity: 0.3;
    transition: opacity 0.5s;
  }
  &:hover {
    &::after{
      opacity: 1;
    }
  }
}

#indofull {
  padding-top: 45%;
  margin-top: 40px;
  margin-bottom: 30px;
  border-radius: 5px;
  position: relative;
  font-size: 1.2rem;
  background-color: #f9f9f9;
  box-shadow: 4px 4px 18px 0px rgba(0, 0, 0, 0.07);
  cursor: default !important;
  .svg1 {
	&:hover {
	  transform: scale(1.2) translateY(-2px);
	}
  }
  #fullscreen-button {
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
	i:nth-of-type(1) {
	  display: initial;
	}
	i:nth-of-type(2) {
	  display: none;
	}
	&.isFullScreen {
	  i:nth-of-type(1) {
		display: none;
	  }
	  i:nth-of-type(2) {
		display: initial;
	  }
	}
	> span {
	  display: none;
	  @include mq("tablet") {
		display: block;
	  }
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
  pointer-events: none;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
  height: 100;
}

.full-screen-prompt {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0 15px;
  background-color: #e8e8e8;
  background-color: rgba(255,255,255,0.9);
  z-index: 4000;
  height: 100%;
  display: none;
  &.show {
	@include mq("tablet", "max") {
	  display: flex;
	}
  }
  align-items: center;
  justify-content: center;
}

.turn-landscape-prompt {
  position: absolute;
  right: 0;
  bottom: 40px;
  left: 0;
  z-index: 3500;
  transform: translateY(100px);
  transition: transform 0.3s ease 0.4s;
  &.show {
	transform: translateY(0);
  }
  .info {
	width: 60%;
	margin: 0 auto;
	background-color: rgba(0,0,0,0.45);
	padding: 3px 11px;
	border-radius: 8px;
	color: white;
	font-size: 0.7em;
  }
}

#island-info-box, #place-info-box {
  pointer-events: auto;
  position: absolute;
  text-align: center;
  display: block;
  width: 405px;
  box-sizing: content-box;
  @include mq("tablet", "max") {
	width: 100%;
	box-sizing: border-box;
	@media only screen and (orientation: landscape) {
	  display: grid;
	  grid-template-columns: 1fr 1fr;
	  grid-column-gap: 25px;
	}
  }

  .date-flow { grid-row: 1; grid-column: 1 / 3; }
  .left-col { grid-row: 2; grid-column: 1; }
  .right-col { grid-row: 2; grid-column: 2; }
  .buttons { 
	grid-row: 3; grid-column: 1 / 3; 
	margin: 0;
	display: flex;
	justify-content: space-around;
	@include mq("tablet", "max") {
	  @media only screen and (orientation: landscape) {
		margin: 0 10%;
		margin-top: -15px;
	  }
	}
  }
  top: 0;
  padding: 14px 22px;
  box-shadow: 3px -5px 10px -3px rgba(0,0,0,0.3);
  // border-radius: 8px;
  border-radius: 0px;
  // border-bottom-left-radius: 10px;

  height: 100%;
  overflow: visible;
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
	display: flex;
	align-items: center;
	.active {
	  font-weight: 600;
	}
	img {
	  width: 20px;
	  height: 20px;
	  margin: 0 2px;
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
	margin: 15px 0 12px 0;
	@include mq("tablet") {
	  margin-bottom: 20px;
	}
	img {
	  width: 100%;
	  height: 170px;
	  @include mq("tablet", "max") {
		@media only screen and (orientation: landscape) {
		  width: 90%;
		  height: 45vh;
		}
	  }
	  object-fit: cover
	}
  }
  .preview-text-container {
	padding: 0 2%;
	font-family: "Crimson Text";
	text-align: left;
  }
  button {
	margin-top: 15px;
	max-width: 45%;
	@include mq("tablet") {
	  margin-top: 20px;
	}
	cursor: pointer;
	color: $palette-text-dark;
	display: block;
	display: inline;
	float: left;
	&:nth-of-type(2) {
	  float: right;
	}
	background-color: #f3f3f3;
	> i {
	  &.left { margin-right: 5px; }
	  &.right { margin-left: 5px; }
	}
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

</style>