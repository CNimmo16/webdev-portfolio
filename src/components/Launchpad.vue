<template>
    <div class="launchpad">
        <div class="intro-text">
            <h1>I am a self taught junior web developer currently looking for work</h1>
            <ul>
                <li>Check out my recent projects</li>
                <li>Experiments</li>
                <li>Get in touch with me</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "launchpad",
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/_variables.scss';

    .launchpad {
        height: 100vh;
    }
    .intro-text {
        width: fit-content;
        max-width: 800px;
        margin: 0 auto;
        h1 {
            padding-top: 20vh;
            text-align: left;
        }
        ul {
            @extend %font-slabo;
            font-size: 1.5em;
            letter-spacing: 0.1em;
            li {
                padding-bottom: 20px;
                &:nth-of-type(2) {
                    padding-left: 4em;
                }
                &:nth-of-type(3) {
                    padding-left: 8em;
                }
            }
        }
    }
</style>