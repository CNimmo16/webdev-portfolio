<template>
    <article class="showcase__item showcase__item--project">
        <div class="showcase__item__img showcase__item__img--trio">
            <img :src="project.image">
            <div>
                <a class="button" v-for="(link, index) in project.links" :href="link.url" :key="index" target="_blank">{{ link.text }}</a>
            </div>
        </div>
        <div class="content">
            <div class="top-items">
                <a :href="project.links[0].url" target="_blank"><h2>{{ project.titleExtra }}</h2></a>
                <ul>
                    <li v-for="(tag, index) in project.tags" :key="index">
                        <img :src="tag.image">
                        <span>{{ tag.name }}</span>
                    </li>
                </ul>
                <p>
                    {{ project.details }}
                    <!--<br>-->
                    <!--<a v-if="project.href" :href="project.href" target="_blank">{{ project.linkText }}</a>-->
                </p>
            </div>
            <h3>{{ project.titleMain }}</h3>
        </div>
    </article>
</template>

<script>
    
    export default {
        name: "ProjectItem",
        props: ["project"]
    }
    
</script>