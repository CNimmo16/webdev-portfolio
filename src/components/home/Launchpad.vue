<template>
    <section style="background: #263740 !important" id="start" class="section section--blue section--floating">
        <div class="section__content section__content--compact">
            <h1 class="title title--medium title--shadow" style="margin-bottom: 1px;">Hi, I'm Cameron,</h1>
            
            <h2 class="title title--big title--shadow" style="line-height: 1;">
                <span v-for="(letter, index) in titleText[0]" :key="index" class="title-letter">{{ letter }}</span>
                <span v-for="(letter, index) in titleText[1]" :key="index + 'line2'" class="title-letter">{{ letter }}</span>
                <!-- <span>web developer</span> -->
                <br v-if="winWidth < 590">
                <span class="rolodex" :class="{'animate': animateRolodex}">
                    <span class="rolodex__phrase" v-for="(word, index) in wordList" ref="rolodex-phrase" :key="index">
                        <span class="rolodex-letter title-letter"
                        v-for="(letter, i) in word" 
                        :ref="index === 0 ? 'first-rolodex-phrase' : 'rolodex-letter'"
                        :key="i + 'line2'" >{{ letter }}</span>
                    </span>
                </span>
            </h2>

            <p class="para para--shadow" style="color: #d0a0a0; font-size: 1.1em; margin: 40px 0;">I make <span class="beautiful">beautiful</span> web apps with well written code.</p>

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
                animateRolodex: false,
                startDate: "2013-02-08",
                titleTextRaw: "I'm a full-stack ",
                interactive: false,
                winWidth: null,
                animating: false,
                wordList: ["web developer", "designer", "artist", "creative", "web developer"]
            }
        },
        computed: {
            titleText() {
                if(this.winWidth > 595) {
                    return [this.titleTextRaw, ""]
                } else if(this.winWidth > 450) {
                    return [this.titleTextRaw.slice(0, 20), this.titleTextRaw.slice(20)]
                } else {
                    return [this.titleTextRaw.slice(0, 17), this.titleTextRaw.slice(17)]
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.beginAnimation();
            }, 500)
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
                this.$refs["first-rolodex-phrase"].forEach(x => {
                    x.style.translateY = 0;
                    x.style.opacity = 1
                    x.style.scale = 0
                })
                this.$refs["rolodex-letter"].forEach(x => {
                    x.style.opacity = 0
                })
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
                }, "-=300");

                setTimeout(() => {
                    var tl = this.$anime.timeline({
                        loop: true
                    })
                    var phrases = this.$refs["rolodex-phrase"]
                    const duration = 900
                    var keyframes = [
                        {
                            duration,
                            opacity: 1,
                            translateY: [-30, 0]
                        },
                        {
                            duration,
                            opacity: [1,0],
                            translateY: [0, 30]
                        }
                    ]
                    var count = 0
                    for(var i=0; i<phrases.length; i++) {
                        var e = {
                            targets: phrases[i].children,
                            elasticity: 700,
                        }
                        var delays = [2000, 200, 900, 900, 900, 900]
                        if(i === 0) { 
                            e.opacity = 0
                            e.translateY = 30
                            e.duration = 450
                        } else if(i === phrases.length-1) {
                            e.opacity = 1
                            e.translateY = [-30,0]
                            e.duration = duration
                        } else {
                            e.keyframes = keyframes
                        }
                        tl.add(e, count + delays[i])
                        count += delays[i]
                    }
                }, 2500)
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
    font-family: "Dancing Script", monospace;
    font-size: 1.8em;
    line-height: 1;
}

span.clean {
    font-family: "Alegreya Sans SC";
    font-size: 1.5em;
}

.rolodex {
    // ["web developer", "designer", "artist", "scientist", "creative"]
    position: relative;
    height: 18px;
    @media only screen and (max-width: 589px) {
        display: inline-block;
    }
    .rolodex__phrase {
        width: 400px;
        position: absolute;
        overflow: hidden;
        .rolodex-letter {
            display: inline-block;
            min-width: 13px;
        }
    }
}
</style>