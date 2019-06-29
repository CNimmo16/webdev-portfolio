<template>
    <div class="ext-links">
        <nav :class="{ show: showNav }">
            <a class="item" href="https://github.com/CNimmo16/" target="_blank">
                <img src="@/assets/ext-link-icons/github.png">
                <span>Github</span>
            </a>
            <a class="item" href="https://www.linkedin.com/in/cameron-nimmo" target="_blank">
                <img src="@/assets/ext-link-icons/linkedin.png">
                <span>LinkedIn</span>
            </a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "external-links",
        props: ["isHome"],
        data() {
            return {
                moused: false
            }
        },
        computed: {
            scrollTop() {
                return this.$store.state.scrollTop;
            },
            showNav() {
                if(this.scrollTop < 30 && this.isHome) {
                    return false;
                } else {
                    return true;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .ext-links {
        position: fixed;
        z-index: 3000;
        top: 50%;
        transform: translateY(-50%);
        right: 0px;
        padding: 50px 0 50px 50px;
        /*background-color: red;*/
        display: none;
        @include mq("phone") {
            display: block;
        }
        &:hover {
            nav.show {
                transform: scale(1);
                box-shadow: -1px 6px 8px 3px rgba(0,0,0,0.2);
                background-color: #ecf3f7;
                /*background-color: rgba(243, 247, 249, 1);*/
            }
        }
        nav {
            padding: 9px 6px;
            display: flex;
            flex-direction: column;
            background-color: rgba(243, 247, 249, 0.7);
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
            transition: transform 0.25s, box-shadow 0.2s, background-color 0.2s;
            box-shadow: -3px 2px 5px rgba(0,0,0,0.3);
            transform: scale(0.9) translateX(105%);
            transform-origin: right;
            &.show {
                transform: scale(0.9);
            }
            .item {
                margin: 10px 6px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-weight: 400;
                transition: transform 0.2s;
                position: relative;
                &:hover {
                    font-weight: 600;
                    img {
                        filter: drop-shadow(1px 2px 0px #555);
                    }
                }
                img {
                    width: 48px;
                    height: 48px;
                    margin-bottom: 7px;
                }
            }
        }
    }
</style>