<template>
    <div class="project">
        <div class="workspace"></div>
        <img v-for="(image, index) in project.images" :key="index" :src="image">
        <!--<div class="glass"></div>-->
        <div class="content">
            <div class="top-items">
                <h2>{{ project.titleExtra }}</h2>
                <ul>
                    <li v-for="(tag, index) in project.tags" :key="index">
                        <img :src="tag.image">
                        <span>{{ tag.name }}</span>
                    </li>
                </ul>
                <p>{{ project.details }}</p>
            </div>
            <h3>{{ project.titleMain }}</h3>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: "ProjectItem",
        props: ["project"]
    }
    
</script>

<style lang="scss" scoped>
    
$padding: 15px;
$trans-time: 0.65s;
/*$trans-time: 6s;*/
    
.project {
    position: relative;
    height: 460px;
    flex-grow: 1;
    flex-basis: 550px;
    overflow: hidden;
    margin: 13px;
    transition: flex-grow $trans-time;
    padding: 5%;
    box-sizing: border-box;
    > img {
        align-self: right;
        object-fit: contain;
        object-position: right;
        transition: transform $trans-time, opacity $trans-time;
        position: absolute;
        top: 0;
        left: 0;
        filter: drop-shadow(-1px 2px 0px #888);
        &:nth-of-type(1) {
            width: 75%;
            transform-origin: 85% 95%;
            left: 12.5%;
            top: 1.6%;
            /*transform: scale(2);*/
        }
        &:nth-of-type(2) {
            transform-origin: 80% 108%;
            transform: translateX(600px) translateY(400px);
            opacity: 0;
            width: 332px;
        }
        &:nth-of-type(3) {
            transform-origin: 400% 210%;
            transform: translateX(600px) translateY(-400px);
            opacity: 0;
            width: 147px;
        }
    }
    .glass {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $projects-color;
        opacity: 0.1;
        transition: opacity $trans-time;
    }
    .content {
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        /*background-color: rgba(100, 100, 100, 0.6);*/
        /*background-color: rgba(59, 96, 100, 0.95);*/
        color: #fff;
        transition: color $trans-time, background-color $trans-time;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        .top-items {
            transform: translateY(-200px);
            transition: transform $trans-time;
            h2 {
                color: #000;
                margin: 0;
                padding: $padding;
                padding-bottom: 0;
                line-height: 1.5;
            }
            ul {
                margin: 10px $padding;
                color: $palette-primary;
                display: flex;
                li {
                    padding-right: 23px;
                    display: flex;
                    align-items: center;
                    img {
                        width: 25px;
                        padding-right: 5px;
                    }
                }
            }
            p {
                color: $palette-primary;
                font-size: 0.9em;
                padding: 0 $padding;
                margin: 0;
            }
        }
        h3 {
            text-align: left;
            height: 125px;
            width: 70%;
            margin: 0;
            position: relative;
            padding: 5px $padding;
            background-color: rgb(243, 247, 249);
            background-color: rgba(243, 247, 249, 0.8);
            color: #385b6d;
            transition: transform $trans-time, background-color $trans-time;
            @extend %font-slabo;
            font-size: 48px;
            font-weight: 300;
        }
    }
    .workspace {
        background-color: #fff;
        opacity: 0;
        transition: opacity $trans-time;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
    }
    &:hover {
        /*flex-grow: 2;*/
        .content { background-color: transparent; }
        > img { 
            transform: scale(0.55); 
            opacity: 1;
            &:nth-of-type(1) {
                transform: scale(0.65);
            }
        }
        /*img:hover { transform: scale(0.6); z-index: 400; }*/
        .glass { display: none; }
        h3 { transform: translateY(200px); background-color: rgb(243, 247, 249); }
        .top-items { transform: translateY(0); }
        .workspace { opacity: 1; }
    }
    
}
    
</style>