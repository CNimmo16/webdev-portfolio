<template>
    <section id="start" class="section section--blue section--floating">
        <div class="section__content section__content--compact">
            <h1 class="title title--medium title--shadow">Hi, I'm Cameron,</h1>
            
            <h2 class="title title--big title--shadow" v-if="winWidth > 595">
                <span v-for="(letter, index) in titleText.slice(0,38)" :key="index" class="title-letter">{{ letter }}</span>
                <br>
                <span v-for="(letter, index) in titleText.slice(39)" :key="index + 'line2'" class="title-letter">{{ letter }}</span>
            </h2>
            <h2 class="title title--big title--shadow" v-else-if="winWidth > 450">
                <span v-for="(letter, index) in titleText.slice(0,20)" :key="index" class="title-letter">{{ letter }}</span>
                <br>
                <span v-for="(letter, index) in titleText.slice(21)" :key="index + 'line2'" class="title-letter">{{ letter }}</span>
            </h2>
            <h2 class="title title--big title--shadow" v-else>
                <span v-for="(letter, index) in titleText.slice(0,17)" :key="index" class="title-letter">{{ letter }}</span>
                <br>
                <span v-for="(letter, index) in titleText.slice(17)" :key="index + 'line2'" class="title-letter">{{ letter }}</span>
            </h2>

            <p class="para para--shadow" style="font-size: 1.1em; margin: 40px 0;">I make <span class="beautiful">beautiful</span> web apps with well written code.</p>

            <button class="button button--light cta" style="opacity: 0;" v-scroll-to="{
            el: '#projects',
            easing: 'ease',
            duration: 1000
        }">Check out my work</button>
        </div>
        <div class="down-button" v-if="winWidth > 595" v-scroll-to="{
            el: '#projects',
            easing: 'ease',
            duration: 1000
        }">
           <!-- <span>Get scrolling</span> -->
           <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" height="40" width="100" version="1.1" viewBox="0 0 26.458333 10.583247">
            <linearGradient id="svg-gradient" x2="1" y2="1">
               <stop offset="0%" stop-color="#fff" />
               <stop offset="20%" stop-color="#ddd" />
               <stop offset="100%" stop-color="#fff" />
             </linearGradient>
            <g transform="translate(-.0050005 -286.42)">
             <g transform="matrix(.26458 0 0 .25993 -10.111 261.77)">
              <path d="m138.14 95.001-49.952 29.229-49.864-29.229l-0.000013 11.22 49.862 29.228 49.954-29.228z" fill-opacity="0" stroke="#fff" stroke-width=".18438"/>
             </g>
            </g>
           </svg>
        </div>
    </section>
</template>

<script>
// import _ from "lodash";

    export default {
        name: "launchpad",
        data() {
            return {
                startDate: "2013-02-08",
                titleText: "I'm a full-stack web developer",
                interactive: false,
                winWidth: null,
                animating: false
            }
        },
        computed: {
            pageInView() {
                return this.$store.state.page
            }
        },
        watch: {
            pageInView: function(newValue, oldValue) {
                if(newValue === 1 && oldValue !== 1 && !this.animating) {
                    this.beginAnimation();
                }
            }
        },
        mounted() {
            this.winWidth = window.innerWidth;
            window.addEventListener("resize", () => {
                this.winWidth = window.innerWidth
                for(const letter of document.getElementsByClassName("title-letter")) {
                    letter.style.transform = "scale(1) translateY(0)" 
                }
            })
        },
        methods: {
            beginAnimation() {
                this.animating = true;
                let entrance = this.$anime.timeline({
                    complete: () => {
                        this.interactive = true;
                    }
                });
            
                entrance
                .add({
                    targets: "#start h1",
                    translateY: [60, 0],
                    opacity: 1
                }, 0)
                .add({
                    targets: "#start .title-letter",
                    scale: [0, 1],
                    elasticity: 600,
                    duration: 700,
                    delay: this.$anime.stagger(15)
                }, 700)
                .add({
                    targets: "#start p",
                    translateY: [-50, 0],
                    duration: 1300,
                    easing: "easeOutQuad"
                }, "-=1300")
                .add({
                    targets: "#start p",
                    opacity: 1,
                    duration: 1300,
                    easing: "linear"
                }, "-=800")
                .add({
                    targets: "#start .cta",
                    opacity: 1,
                    easing: "easeInQuad",
                    duration: 900
                }, "-=300")
                .add({
                    targets: "#start h3",
                    translateY: [-20, 0],
                    duration: 1000,
                    easing: "easeOutQuad"
                }, "-=700")
                .add({
                    targets: "#start h3",
                    opacity: 1,
                    duration: 1000,
                    easing: "linear"
                }, "-=1000")
                .add({
                    targets: "#start .skills li",
                    translateY: [-20, 0],
                    duration: 1000,
                    easing: "easeOutQuad",
                    delay: this.$anime.stagger(120),
                }, "-=1000")
                .add({
                    targets: "#start .skills li",
                    opacity: 1,
                    duration: 300,
                    easing: "linear",
                    delay: this.$anime.stagger(120),
                    complete: () => {
                        let entrance = this.$anime.timeline({
                            loop: true,
                        })
                        
                        entrance
                        .add({
                            targets: "#start .title-letter",
                            keyframes: [
                                {translateY: 0},
                                {translateY: -6},
                                {translateY: 0},
                            ],
                            elasticity: 200,
                            duration: 200,
                            easing: "easeInOutQuad",
                            delay: this.$anime.stagger(20, {start: 1000})
                        })
                        .add({
                            targets: "#start .skills li img",
                            keyframes: [
                                {translateY: 0},
                                {translateY: -5},
                                {translateY: 0},
                            ],
                            elasticity: 200,
                            duration: 500,
                            easing: "easeInOutQuad",
                            delay: this.$anime.stagger(130),
                        })
                    }
                }, "-=1300")
            },
            getOffset( el ) {
                var _x = 0;
                var _y = 0;
                while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                    _x += el.offsetLeft - el.scrollLeft;
                    _y += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                }
                return { top: _y, left: _x };
            },
        }
    }
</script>

<style lang="scss" scoped>

        h1, h3 {
            opacity: 0;
        }
        .title-letter {
            display: inline-block;
            transform: scale(0);
            opacity: 1;
            min-width: 0.7ch;
            transform-origin: 20% 150%;
        }
        #start p {
            opacity: 0;
        }

        span.beautiful {
            font-family: "Dancing Script";
            font-size: 1.8em;
            line-height: 1;
            // text-shadow: none;
            // font-family: "Alegreya Sans SC"
        }

        span.clean {
            font-family: "Alegreya Sans SC";
            font-size: 1.5em;
        }

        ul.nutshell {
            display: flex;
            width: 100%;
            li {
                padding: 0 10px;
                color: $palette-background-light;
                &:nth-of-type(1) {
                    padding-left: 0;
                }
            }
        }
        ul.skills {
            font-size: 1em;
            font-weight: 400;
            letter-spacing: 0.03em;
            li {
                opacity: 0;
                padding-bottom: 35px;
                display: flex;
                align-items: center;
                @include mq("large-phone") {
                    &:nth-of-type(2) {
                        padding-left: 2em;
                    }
                    &:nth-of-type(3) {
                        padding-left: 4em;
                    }
                    &:nth-of-type(4) {
                        padding-left: 6em;
                    }
                    &:nth-of-type(5) {
                        padding-left: 8em;
                    }
                }
                img {
                    height: 35px;
                    padding-right: 15px;
                }
                span {
                    text-transform: capitalize;
                }
            }
        }
</style>