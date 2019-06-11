<template>
  <div id="app">
    <div class="nav-toggle" @click="navOpen = !navOpen" :class="{ close: navOpen, open: !navOpen }">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <Navbar :open="navOpen" @close-nav="navOpen = false" />
    <!--<transition :name="routeslide">-->
      <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue"

  export default {
    components: {
      Navbar
    },
    data() {
      return {
        navOpen: false
      }
    },
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans:300,400,600|Rokkitt|Slabo+27px|Alegreya');

#app {
  font-family: 'Merriweather Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $palette-text-dark;
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
  right: 55px;
  top: 35px;
  z-index: 800;
  .bar {
    position: absolute;
    height: 4px;
    width: 33px;
    background-color: $palette-text-light;
    transition: transform 0.5s;
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
  &.close {
    .bar {
      &:nth-of-type(1) {
        transform: rotate(-315deg) scaleX(1.2);
        animation: bar1 0.7s;
      }
      &:nth-of-type(2) {
        display: none;
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
