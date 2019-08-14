<template>
    <section id="projects"  class="section section--light">
        <div class="section__content">
            <h1 class="section__header">Projects</h1>
            <p class="section__intro">Check out my latest work</p>
            <div class="showcase">
                <ProjectItem v-for="(project, index) in projectData" :project="project" :key="index" />
            </div>
        </div>
    </section>
</template>

<script>
    import ProjectItem from "@/components/home/_ProjectItem.vue"

    export default {
        name: "projects",
        components: {
            ProjectItem
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
                    prismic: {
                        name: "Prismic.io",
                        image: require("@/assets/skill-icons/prismic.png")
                    }
                }
            }
        },
        computed: {
            projectData() {
                return [
                    {
                        ref: "lightning",
                        titleMain: "Lightning Commerce",
                        titleExtra: "Lightning Commerce",
                        details: "Lightning commerce is a lightning fast E-Commerce platform built from scratch on NodeJS, using the KOA Framework.",
                        image: require("@/assets/work/projects/lightning.jpg"),
                        tags: [this.icons.node, this.icons.vue, this.icons.js],
                        links: [{
                            text: "Github",
                            url: "https://github.com/CNimmo16/lightning-commerce"
                        },
                        {
                            text: "Demo site",
                            url: "https://lightning-commerce-demo.herokuapp.com/admin",
                        }]
                    },
                    {
                        ref: "indonesia",
                        titleMain: "Trip the Distance - Indonesia",
                        titleExtra: "Trip the Distance - Indonesia",
                        details: "I designed, developed and deployed the Indonesia site for the tripthedistance.com bilingual travel blog, running on an Express based custom CMS built from scratch.",
                        image: require("@/assets/work/projects/indonesia.jpg"),
                        tags: [this.icons.html5, this.icons.js, this.icons.node, this.icons.ck],
                        links: [{
                            text: "Live site",
                            url: "https://indonesia.tripthedistance.com",
                        }]
                    },
                    {
                        ref: "japan",
                        titleMain: "Trip the Distance - Japan",
                        titleExtra: "Trip the Distance - Japan",
                        details: "I designed, developed and deployed the Japan site for the tripthedistance.com travel blog. Content managed with Prismic.io headless CMS.",
                        image: require("@/assets/work/projects/japan2.jpg"),
                        tags: [this.icons.vue, this.icons.nuxt, this.icons.prismic],
                        links: [{
                            text: "Live site",
                            url: "https://japan.tripthedistance.com",
                        },
                        {
                            text: "Github",
                            url: "https://github.com/CNimmo16/tripthedistance-japan"
                        }]
                    },
                ]
            }
        }
    }
</script>