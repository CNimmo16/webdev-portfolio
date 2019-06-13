<template>
    <div class="project-nav">
        <!--<a>The Lab</a>-->
        <!--<img src="@/assets/ui-icons/right-chevron.svg">-->
        <!--<h1>The Lab</h1>-->
        <!--<div class="flex">-->
        <!--    <router-link to="/interactive-indonesia">Interactive Indonesia</router-link>-->
        <!--    <router-link to="/ripple-music">Ripple</router-link>-->
        <!--</div>-->
    </div>
</template>

<style lang="scss" scoped>
    .project-nav {
        margin-top: -10px;
        margin-bottom: 50px;
        width: 100%;
        h1 {
            @extend %font-slabo;
            color: $palette-text-dark;
            margin: 0 auto;
            text-align: center;
            margin-bottom: 20px;
        }
        .flex {
            display: flex;
            justify-content: center;
            width: 100%;
            img {
                margin: 0 -5px;
            }
            a {
                @extend %font-slabo;
                margin: 3px 10px;
                color: $palette-text-blue;
                font-weight: 300 !important;
                font-size: 1.3em;
                text-decoration: none;
            }
            .router-link-exact-active {
                font-weight: 600 !important;
                border-bottom: 2px solid $palette-text-blue;
            }
        }
    }
</style>