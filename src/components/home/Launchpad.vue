<template>
    <section id="start" class="section section--blue section--floating">
        <div class="section__content section__content--compact">
            <h1 class="title title--medium title--shadow">Hi, I'm Cameron,</h1>
            
            <h2 class="title title--big title--shadow" v-show="!isPhone">
                <span v-for="(letter, index) in titleText.slice(0,38)" :key="index" class="title-letter">{{ letter }}</span>
                <br>
                <span v-for="(letter, index) in titleText.slice(39)" :key="index + 'line2'" class="title-letter">{{ letter }}</span>
            </h2>
            <h2 class="title title--big title--shadow" v-show="isPhone">
                <span v-for="(letter, index) in titleText.slice(0,20)" :key="index" class="title-letter">{{ letter }}</span>
                <br>
                <span v-for="(letter, index) in titleText.slice(21)" :key="index + 'line2'" class="title-letter">{{ letter }}</span>
            </h2>
            <!--<p>After a two year hiatus of travelling and part time jobs trying to work out what I enjoyed doing, I tried out a udemy course in web development and realised it was this. After spending <span>{{ "2018-12-11" | moment("from", "now", true) }}</span> studying web development independently, I am: -->
            <!--</p>-->
            <!--<ul class="employer skills">-->
            <!--    <li><img src="@/assets/skill-icons/html5.png"><span>proficient in HTML5 and CSS including layout, design and animation.</span></li>-->
            <!--    <li><img src="@/assets/skill-icons/js.png"><span>skilled at using JavaScript, able to make full use of ES6 and newer features where possible and beneficial.</span></li>-->
            <!--    <li><img src="@/assets/skill-icons/vue.png"><span>able to use Vue JS to build Single Page Applications with SSR implementation if needed.</span></li>-->
            <!--    <li><img src="@/assets/skill-icons/node.png"><span>able to build and deploy a full-stack site from scratch using Node JS (Express) and MongoDB.</span></li>-->
            <!--</ul>-->
            <p class="para para--shadow">It's 2019: no one should still have to pick between a website that looks beautiful, and one that works beautifully. I love creating rich, immersive Javascript powered web applications that look great. But I also work hard to ensure beauty doesn't come at the expense of responsiveness or user experience.
            </p>
            <h3 class="title title--small title--shadow">I build sites with... </h3>
            <ul class="list list--shadow freelance skills">
                <li><img src="@/assets/skill-icons/html5.png">Highly semantic markup and object oriented styling which is a pleasure to read, and a breeze to maintain.</li>
                <li><img src="@/assets/skill-icons/js.png">Javascript that is well optimised, but sparingly used, with minimal dependency on external libraries, boosting code reliability and reducing maintenance work</li>
                <li><img src="@/assets/skill-icons/gsap.png">Thoughtful and intuitive ui animation effects to snazz things up and/or improve usability</li>
                <li><img src="@/assets/skill-icons/node.png">An efficient, modern NodeJS backend if needed, built on a well structured NoSQL database.</li>
            </ul>
        </div>
        <!--<div class="down-button" v-scroll-to="{-->
        <!--    el: '#projects',-->
        <!--    easing: 'ease',-->
        <!--    duration: 1000-->
        <!--}">-->
        <!--    <span>Scroll to see my work</span>-->
        <!--    <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" height="40" width="100" version="1.1" viewBox="0 0 26.458333 10.583247">-->
        <!--     <linearGradient id="svg-gradient" x2="1" y2="1">-->
        <!--        <stop offset="0%" stop-color="#fff" />-->
        <!--        <stop offset="20%" stop-color="#ddd" />-->
        <!--        <stop offset="100%" stop-color="#fff" />-->
        <!--      </linearGradient>-->
        <!--     <g transform="translate(-.0050005 -286.42)">-->
        <!--      <g transform="matrix(.26458 0 0 .25993 -10.111 261.77)">-->
        <!--       <path d="m138.14 95.001-49.952 29.229-49.864-29.229l-0.000013 11.22 49.862 29.228 49.954-29.228z" fill-opacity="0" stroke="#fff" stroke-width=".18438"/>-->
        <!--      </g>-->
        <!--     </g>-->
        <!--    </svg>-->
        <!--</div>-->
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
                isPhone: null,
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
            this.isPhone = window.innerWidth < 615;
            window.addEventListener("resize", () => {
                this.isPhone = window.innerWidth < 615
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