<template>
    <router-link v-if="project.href" :to="project.href">
        <article class="showcase__item showcase__item--experiment">
            <img class="showcase__item__img" :src="project.images[0]">
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
                        <router-link v-if="project.href" :to="project.href">Click to check it out</router-link>
                    </p>
                </div>
                <h3>{{ project.titleMain }}</h3>
            </div>
        </article>
    </router-link>
</template>

<script>
    
    export default {
        name: "ProjectItem",
        props: ["project"]
    }
    
</script>