<template>
  <div id="app">
    <Navbar />
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
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans:300,400|Rokkitt|Slabo+27px|Alegreya');

#app {
  font-family: 'Merriweather Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $palette-primary;
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
