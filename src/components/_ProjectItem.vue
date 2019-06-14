<template>
    <a v-if="project.href" :href="project.href" target="_blank">
        <article class="showcase__item showcase__item--project">
            <div class="workspace"></div>
            <img class="showcase__item__img showcase__item__img--trio" v-for="(image, index) in project.images" :key="index" :src="image">
            <div class="content">
                <div class="top-items">
                    <h2>{{ project.titleExtra }}</h2>
                    <ul>
                        <li v-for="(tag, index) in project.tags" :key="index">
                            <img :src="tag.image">
                            <span>{{ tag.name }}</span>
                        </li>
                    </ul>
                    <p>
                        {{ project.details }}
                        <!--<br>-->
                        <a v-if="project.href" :href="project.href" target="_blank">Click to see the live site</a>
                    </p>
                </div>
                <h3>{{ project.titleMain }}</h3>
            </div>
        </article>
    </a>
</template>

<script>
    
    export default {
        name: "ProjectItem",
        props: ["project"]
    }
    
</script>