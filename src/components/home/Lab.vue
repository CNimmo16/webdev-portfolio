<template>
    <section id="lab"  class="section section--dark">
        <div class="section__content">
            <div class="wave-header">
                <div class="wave"></div>
                <h1 class="section__header">The Lab</h1>
            </div>
            <p class="section__intro">A showcase of funky experimental stuff that I created either as part of another project, or as a challenge to improve my skills.</p>
            <div class="showcase">
                <LabItem v-for="(project, index) in projectData" :project="project" :key="index" />
            </div>
        </div>
    </section>
</template>

<script>
    import LabItem from "@/components/home/_LabItem.vue"

    export default {
        name: "lab",
        components: {
            LabItem
        },
        data() {
            return {
                icons: {
                    html5: {
                        name: "HTML5",
                        image: require("@/assets/skill-icons/html5.png")
                    },
                    js: {
                        name: "Javascript ES6",
                        image: require("@/assets/skill-icons/js.png")
                    },
                    vue: {
                        name: "VueJS",
                        image: require("@/assets/skill-icons/vue.png")
                    },
                    nuxt: {
                        name: "NuxtJS",
                        image: require("@/assets/skill-icons/nuxt.png")
                    },
                    node: {
                        name: "Node",
                        image: require("@/assets/skill-icons/node.png")
                    },
                    ck: {
                        name: "CKEditor",
                        image: require("@/assets/skill-icons/ckeditor.png")
                    },
                    gsap: {
                        name: "GSAP",
                        image: require("@/assets/skill-icons/gsap.png")
                    },
                    leaflet: {
                        name: "Leaflet",
                        image: require("@/assets/skill-icons/leaflet.png")
                    }
                }
            }
        },
        computed: {
            projectData() {
                return [
                    {
                        ref: "ripple",
                        titleMain: "Ripple Immersive Music Player",
                        titleExtra: "Ripple - a music player for the future",
                        details: "Ripple is a concept interface for an immersive music streaming service.",
                        image: require("@/assets/work/lab/ripple.png"),
                        tags: [this.icons.vue, this.icons.js, this.icons.gsap],
                        href: "/ripple-music"
                    },
                    {
                        ref: "interactive_indonesia",
                        titleMain: "Interactive Indonesia",
                        titleExtra: "Interactive Indonesia",
                        details: "A Javascript based fully explorable map of Indonesia created for the tripthedistance.com travel blog.",
                        image: require("@/assets/work/lab/indomap.png"),
                        tags: [this.icons.js, this.icons.leaflet],
                        href: "/interactive-indonesia"
                    },
                ]
            }
        }
    }
</script>

<style lang="scss">
    #lab {
        .section__header {
            &::after { border-left: 6px solid $palette-lab-yellow; }
        }
        .wave {
            --wave-color: #e09100;
            left: 14px;
            right: 6px;
        }
    }
</style>