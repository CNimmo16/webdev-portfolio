<template>
  <div id="app">
    <div id="nav-sensor" @mouseover="showNav = true"></div>
    <div id="nav" :class="{ show: showNav }" @mouseleave="showNav = false">
      <router-link to="/">Home</router-link>
      <router-link to="/work">Projects</router-link>
      <router-link to="/experiments">Experiments</router-link>
    </div>
    <!--<transition :name="routeslide">-->
      <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showNav: false
      }
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=BioRhyme+Expanded|Merriweather+Sans|Rokkitt|Slabo+27px');

body {
  margin: 0;
}
#app {
  font-family: 'Merriweather Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #282c34;
}
#nav-sensor {
  position: fixed;
  height: 100px;
  width: 100%;
}
#nav {
  position: fixed;
  width: 100%;
  height: 0;
  transition: height 0.3s;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  &.show {
    height: 100px;
  }
  a {
    padding: 0 15px;
    color: #a9a9a9;
    font-weight: bold;
    font-family: "Slabo 27px";
    text-decoration: none;
    font-size: inherit;
    letter-spacing: 3px;
    text-transform: uppercase;
    &.router-link-exact-active {
      color: #fff;
    }
    &:hover {
      color: #fff;
    }
    + a {
      border-left: 2px solid #fff;
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
