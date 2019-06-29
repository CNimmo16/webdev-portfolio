<template>
	<section id="ripple" class="section section--light">
		<ProjectNav />
		<div class="section__content">
			<h1 class="title title--big">Ripple Immersive Music Player</h1>
			<p>Ripple is a concept interface for an immersive music streaming service. I wanted to create a music playback interface that was impressive to look at and fun to explore, a kind of homage to the title browsing page on Netflix's desktop site, but for music. Ripple is designed as a desktop web application, but already has good size scaling on mobile and would just need to respond to swipe gestures with touchstart and touchend events to be fully mobile friendly.</p>
			<a class="preview" href="https://cnimmo16.github.io/Ripple/" target="_blank">
				<img src="@/assets/projects/lab/ripple/preview.png">
				<div class="overlay"></div>
				<div class="text">Click to launch Ripple</div>
			</a>
			<h2>Motivations for the project</h2>
			<ol>
				<li><strong>A 3D world - </strong>I find 3D transformations one of the most complicated features of CSS to understand. But when used correctly, they can transform a dull, flat website into an immersive web application. I wanted to try a project that would improve my knowledge of working in the 3D space, and building Ripple definitely helped out with that.</li>
				<li><strong>Celebration of cover art - </strong>The days of huge square foot vinyl record covers may be over, but most artists still put a lot of thought into their album and single covers. While mobile apps like Spotify and Apple Music still display the cover prominently on the currently playing song, their desktop equivalents don't. I wanted to put the album art front stage, both as a celebration of its design and also because image and video is a key way of increasing immersion.</li>
			</ol>
			
			<h2>Development challenges</h2>
			<p>There are plenty of tutorials and codepens online featuring 3D carousels built with CSS, usually aimed at images. However, I felt that many of them looked too basic and cheaply made, so set out to built a next generation of 3D carousel. A standard CSS 3D carousel uses only one CSS transformation: <em>rotateY</em>, to create the 3D effect, rotating each item at equal intervals around a vanishing point. For my interface, I combined this rotation about the Y axis with translation in both the horizontal (<em>translateX</em>) and 3d (<em>translateZ</em>) axes, as well as scaling (<em>scale</em>) to simulate a small section of a huge carousel stretching into infinity.</p>
			<p>The result is a carousel which is more fun to navigate, and combined with the perspective change on mousemove, creates a believable impression of exploring a 3D musical world.</p>
			
			<h2>Performance</h2>
			<p>The interface uses 3d matrix transformations, which are very resource intensive. I initially dealt with animation using the well documented <a href="https://animejs.com/" target="_blank">AnimeJS</a>, but switched to <a href="https://greensock.com/gsap" target="_blank">GSAP</a> which dramatically improved performance, largely due to it forcing hardware acceleration by default.</p>
			<p>In order to avoid using complicated animation timelines, or recalculating animation distances mid-animation, I decided to take advantage of Vue's modularity by calculating all animation positioning globally, then sending animation instructions to each component based on these calculations. </p>
			<p>In practice, this means a function called on <em>mousemove</em>, which calculates the position each song "card" should be in based on the user's horizontal mouse position, and whether the track is currently being hovered over. The function returns an array of target positions, which can then be allocated to each respective song card and individually animated. This ensures that when animation is in progress, there is always exactly 11 simultaneous animations occuring, no more or less, keeping system resource demands stable. </p>
			
			<h2>The little things</h2>
			<p>I'm really satisfied with the way that track info, player controls and instructional tabs switch position on track change. The peek-a-boo effect is kept smooth by assigning each song card one of these tabs on application launch, and peeking the correct one up and down based on which song is currently playing. It uses CSS transitions to keep scripting to a minimum.</p>
			<a class="big" href="https://cnimmo16.github.io/Ripple/" target="_blank">Click to launch Ripple.</a>
		</div>
	</section>
</template>

<script>
	import ProjectNav from "@/components/ProjectNav.vue";


	export default {
		components: {
			ProjectNav
		}
	}
</script>

<style lang="scss">
	#ripple {
		/*background: linear-gradient(90deg, rgba(11,0,43,1) 0%, rgba(0,24,102,0.8) 55%, rgba(11,0,43,1) 100%);*/
		/*color: $palette-text-light;*/
		a {
			color: $palette-text-blue;
			font-weight: 400;
			&.big {
				font-size: 1.15em;
			}
		}
		p {
			font-weight: 300;
		}
		.preview {
			display: block;
			width: 100%;
			max-width: 900px;
			margin: 0 auto;
			position: relative;
			margin-bottom: 50px;
			img {
				width: 100%;
			}
			&:hover {
				.text { text-decoration: underline; }
				.overlay {
					opacity: 0.6;
				}
			}
			.overlay {
				@extend %overlay;
				/*background-color: rgba(255,255,255,0.7);*/
				background: linear-gradient(90deg, rgba(11,0,43,1) 0%, rgba(0,24,102,0.8) 55%, rgba(11,0,43,1) 100%);
				transition: opacity 0.3s;
				opacity: 0.8;
				
			}
			.text {
				@extend %overlay;
				color: #fff;
				font-size: 1.7em;
				font-weight: 300;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>