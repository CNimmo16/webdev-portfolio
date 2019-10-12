<template>
  <div id="app">
    <div class="nav-toggle" @click="navOpen = !navOpen" :class="{ close: navOpen, open: !navOpen, grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light' }">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <Navbar :open="navOpen" @close-nav="navOpen = false" :isHome="isHome" />
    <ExternalLinks :isHome="isHome" />
    <!--<transition :name="routeslide">-->
      <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  import ExternalLinks from "@/components/ExternalLinks.vue";

  export default {
    name: "App",
    components: {
      Navbar,
      ExternalLinks
    },
    data() {
      return {
        navOpen: false,
        isHome: null,
      }
    },
    watch: {
      '$route.name' (to) {
          this.isHome = (to === "home") ? true : false;
      }
    },
    computed: {
      currentPage() {
        return this.$store.state.page;
      },
      pageColor() {
        var color = null;
        switch(this.currentPage) {
            case 0:
                color = "grey";
                break;
            case 1:
                color = "blue";
                break;
            case 2:
                color = "light";
                break;
            case 3:
                color = "grey";
                break;
            case 4:
                color = "light";
                break;
        }
        return color;
      }
    },
    mounted() {
      this.isHome = (this.$router.currentRoute.name === "home") ? true : false;
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans:300,400,600|Inconsolata|Slabo+27px');

#app {
  font-family: 'Merriweather Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $palette-text-dark;
  overflow-x: hidden;
}

@keyframes bar1 {
  0% { transform: translateY(-12px); }
  30% { transform: translateY(0); }
  100% { transform: translateY(0) rotate(-315deg) scaleX(1.2); }
}

@keyframes bar2 {
  0% { transform: translateY(12px); }
  30% { transform: translateY(0); }
  100% { transform: translateY(0) rotate(315deg) scaleX(1.2); }
}

.nav-toggle {
  position: fixed;
  right: 0;
  top: 0;
  width: 50px;
  height: 45px;
  z-index: 800;
  @include mq("phone") {
    display: none;
  }
  .bar {
    top: 22px;
    left: 9px;
    position: absolute;
    height: 4px;
    width: 33px;
    transition: transform 0.5s, background-color 1s, opacity 0.7s;
    &:nth-of-type(1) {
      transform: translateY(-12px);
    }
    &:nth-of-type(2) {
      transform: translateY(0px);
    }
    &:nth-of-type(3) {
      transform: translateY(12px);
    }
  }
  &.grey .bar { background-color: $palette-text-light; }
  &.blue .bar { background-color: $palette-text-blue; }
  &.light .bar { background-color: #487084; }
  &.close {
    .bar {
      background-color: $palette-text-blue;
      &:nth-of-type(1) {
        transform: rotate(-315deg) scaleX(1.2);
        animation: bar1 0.7s;
      }
      &:nth-of-type(2) {
        opacity: 0;
      }
      &:nth-of-type(3) {
        transform: rotate(315deg) scaleX(1.2);
        animation: bar2 0.7s;
      }
    }
  }
}

/*.routeslide-enter {*/
/*  transition: transform 2s;*/
/*  transform: translateY(-100vh);*/
/*}*/

/*.routeslide-enter-active {*/
/*  transform: translateY(0);*/
/*}*/

/*.routeslide-leave-to {*/
/*  transition: transform 2s;*/
/*  transform: translateY(0);*/
/*}*/

/*.routeslide-leave-active {*/
/*  transform: translateY(100vh);*/
/*}*/
</style>
