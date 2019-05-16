<template>
    <div id="start" class="home section">
        <div class="intro-text">
            <h1>Hi, I'm Cameron,</h1>
            
            <h2 @mouseleave="mouseoutParent($event.target)">
                <span v-for="(letter, index) in titleText" :key="index" class="title-letter" @mouseenter="letterRaise($event.target)">{{ letter }}</span>
            </h2>
            <p>After a two year hiatus of travelling and part time jobs trying to work out what I enjoyed doing, I tried out a udemy course in web development and realised it was this. After spending <span>{{ "2018-12-11" | moment("from", "now", true) }}</span> studying web development independently, I am: 
            </p>
            <ul class="skills">
                <li><img src="@/assets/skill-icons/html5.png"><span>proficient in HTML5 and CSS including layout, design and animation.</span></li>
                <li><img src="@/assets/skill-icons/js.png"><span>skilled at using JavaScript, both ES6 focused and with knowledge of fallback syntax.</span></li>
                <li><img src="@/assets/skill-icons/vue.png"><span>able to use Vue JS to build Single Page Applications with SSR implementation if needed.</span></li>
                <li><img src="@/assets/skill-icons/node.png"><span>able to build and deploy a full-stack site from scratch using Node JS (Express) and MongoDB.</span></li>
            </ul>
        </div>
        <div class="down-button" v-scroll-to="{
            el: '#projects',
            easing: 'ease',
            duration: 1000
        }">
            <span>Scroll to see my work</span>
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
    </div>
</template>

<script>
import _ from "lodash";

    export default {
        name: "launchpad",
        data() {
            return {
                startDate: "2013-02-08",
                titleText: "I'm a self-taught junior web developer currently looking for work",
                interactive: false
            }
        },
        mounted() {
            let entrance = this.$anime.timeline({
                complete: () => {
                    this.interactive = true;
                }
            });
        
            entrance
            .add({
                targets: ".intro-text h1",
                translateY: [60, 0],
                opacity: 1
            }, 500)
            .add({
                targets: ".intro-text .title-letter",
                scale: [0, 1],
                elasticity: 600,
                duration: 700,
                delay: this.$anime.stagger(15)
            }, 1000)
            .add({
                targets: ".intro-text p",
                translateY: [-20, 0],
                duration: 1000,
                easing: "easeOutQuad"
            }, "-=600")
            .add({
                targets: ".intro-text p",
                opacity: 1,
                duration: 1000,
                easing: "linear"
            }, "-=1000")
            .add({
                targets: ".intro-text .skills li",
                opacity: 1,
                scale: [0, 1],
                elasticity: 200,
                duration: 1200,
                delay: this.$anime.stagger(1300),
                complete: () => {
                    let entrance = this.$anime.timeline({
                        loop: true,
                    })
                    
                    entrance
                    .add({
                        targets: ".intro-text .title-letter",
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
                        targets: ".intro-text .skills li img",
                        keyframes: [
                            {translateY: 0},
                            {translateY: -5},
                            {translateY: 0},
                        ],
                        elasticity: 200,
                        duration: 500,
                        easing: "easeInOutQuad",
                        delay: this.$anime.stagger(130)
                    })
                }
            }, "+=2000")
        },
        // computed: {
        //     titleArray: function() {
        //         let array = [];
        //         for(let i=0; i<this.titleText.length; i++) {
        //             array.push(this.titleText.slice(i, i+1));
        //         }
        //         return array;
        //     }
        // },
        methods: {
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
            // letterRaise: _.throttle(function(elem) {
            //     // if(this.interactive && elem.matches(".title-letter")) {
            //     if(elem.matches(".title-letter")) {
            //         const parent = elem.parentElement;
            //         const elemIndex = Array.prototype.indexOf.call(parent.children, elem);
            //         for(let i=0; i<7; i++) {
            //             if(elemIndex - i > 0 && elemIndex + i < parent.children.length) {
            //                 let val = ((1 / 3 / (i+1)) + 1);
            //                 parent.children[elemIndex + i].style.transform = "scale(" + val + ")";
            //                 parent.children[elemIndex - i].style.scale = "scale(" + val + ")";
            //             }
            //         }
            //     }
            // }, 5),
            // mouseoutParent(parent) {
            //     if(this.interactive) {
            //         for(let i=0; i<parent.children.length; i++) {
            //             this.$anime({
            //                 targets: parent.children[i],
            //                 scale: 1
            //             }) 
            //         }
            //     }
            // }
        }
    }
</script>

<style lang="scss" scoped>
    

    #start {
        position: relative;
        display: flex;
        align-items: center;
        background-color: $launchpad-color;
        @include mq("large-phone", "max") {
            height: auto;
        }
        /*@include mq("small-monitor", "max") {*/
        /*    height: 130vh*/
        /*}*/
        min-height: fit-content;
        box-sizing: border-box;
        padding-top: 100px;
        padding-bottom: 170px;
    }
    .intro-text {
        width: fit-content;
        max-width: 1000px;
        color: #eaf1f5;
        @include mq("small-monitor") {
            max-width: 800px;
        }
        max-height: 100%;
        padding: 0 5%;
        margin: 0 auto;
        h1, h2 {
            text-shadow: -2px 3px 0px #385b6d;
        }
        h1 {
            opacity: 0;
        }
        h2 {
            font-size: 2em;
            @include mq("small-monitor") {
                font-size: 36px;
            }
            span {
                display: inline-block;
                opacity: 1;
                min-width: 0.7ch;
                transform-origin: 20% 150%;
            }
        }
        ul.nutshell {
            display: flex;
            width: 100%;
            li {
                padding: 0 10px;
                color: $palette-background-secondary;
                &:nth-of-type(1) {
                    padding-left: 0;
                }
            }
        }
        p {
            padding-top: 0px;
            padding-bottom: 20px;
            opacity: 0;
        }
        ul.skills {
            font-size: 1em;
            font-weight: 400;
            /*letter-spacing: 0.1em;*/
            li {
                opacity: 0;
                padding-bottom: 30px;
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
    }
</style>