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
    import ProjectItem from "@/components/_ProjectItem.vue"

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
                    }
                }
            }
        },
        computed: {
            projectData() {
                return [
                    {
                        ref: "indonesia",
                        titleMain: "Trip the Distance - Indonesia",
                        titleExtra: "Trip the Distance - Indonesia",
                        details: "I designed, developed and deployed the Indonesia site for the tripthedistance.com travel blog, running on a Express based custom CMS built from scratch.",
                        images: [require("@/assets/projects/indonesia/monitor.png"), require("@/assets/projects/indonesia/ipad2.png"), require("@/assets/projects/indonesia/iphone2.png")],
                        tags: [this.icons.html5, this.icons.js, this.icons.node, this.icons.ck],
                        href: "https://indonesia.tripthedistance.com"
                    },
                    {
                        ref: "japan",
                        titleMain: "Trip the Distance - Japan",
                        titleExtra: "Trip the Distance - Japan",
                        details: "I designed, developed and deployed the Japan site for the tripthedistance.com travel blog.",
                        images: [require("@/assets/projects/japan/monitor.png"), require("@/assets/projects/japan/ipad.png"), require("@/assets/projects/japan/iphone.png")],
                        tags: [this.icons.vue, this.icons.nuxt],
                        href: "https://japan.tripthedistance.com"
                    },
                ]
            }
        }
    }
</script>