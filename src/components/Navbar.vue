<template>
    <div id="navbar" :class="{ open: open }">
        <div id="nav-sensor" @mouseenter="moused = true"  :class="{ fullscreen: fullscreenSensor }"></div>
        <div id="nav" :class="{ show: showNav }" @mouseleave="moused = false">
            
            <a v-if="isHome" :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', 'router-link-exact-active': currentPage === 1 }" v-scroll-to="'#start'" @click.stop="$emit('close-nav')">Home</a>
            <router-link v-else :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', }" to="/">Home</router-link>
            
            <a v-if="isHome" :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', 'router-link-exact-active': currentPage === 2 }" v-scroll-to="'#projects'" @click.stop="$emit('close-nav')">Projects</a>
            <router-link v-else :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', }" to="/#projects">Projects</router-link>
            
            <a v-if="isHome" :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', 'router-link-exact-active': currentPage === 3 }" v-scroll-to="'#lab'" @click.stop="$emit('close-nav')">The Lab</a>
            <router-link v-else :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', 'router-link-exact-active': ($route.path === '/ripple-music' || $route.path === '/interactive-indonesia') }" to="/#lab">The Lab</router-link>
            
            <a v-if="isHome" :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', 'router-link-exact-active': currentPage === 4 }" v-scroll-to="'#contact'" @click.stop="$emit('close-nav')">Work with me</a>
            <router-link v-else :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', }" to="/#contact">Work with me</router-link>
            <!--<router-link :class="{ grey: pageColor === 'grey', blue: pageColor === 'blue', light: pageColor === 'light', }" to="/blog">Blog</router-link>-->
        </div>
    </div>
</template>

<script>
export default {
    name: "navbar",
    data() {
        return {
            moused: false,
        }
    },
    props: ["open", "isHome"],
    watch: {
      open(newVal) {
        this.showNav = newVal;
      },
    },
    computed: {
        currentPage () {
            return this.$store.state.page;
        },
        scrollTop() {
            return this.$store.state.scrollTop;
        },
        showNav() {
            if(this.moused === true) {
                return true;
            } else {
                if(this.scrollTop < 30 && this.isHome) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        fullscreenSensor() {
            return (this.$store.state.page === 0) ? true : false;
        },
        pageColor() {
            var color = null;
            if(this.isHome) {
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
            } else {
              color = "light"
            }
            return color;
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

%nav-height {
    height: 60px;
    @include mq("small-monitor") {
        height: 70px;
    }
}

#navbar {
    position: fixed;
    width: 100%;
    z-index: 20;
    overflow: hidden;
    transition: height 0.5s;
    @extend %nav-height;
    @include mq("phone", "max") {
      display: flex;
      height: 0 !important;
      padding: 0 !important;
      &.open {
        height: 100vh !important;
      }
      padding: 100px 0;
      background-color: $palette-background-blue;
      width: 100vw;
      align-items: center;
      justify-content: center;
      margin: 0;
      box-sizing: border-box;
      #nav {
        flex-direction: column;
        height: auto;
        align-items: flex-start;
        width: fit-content;
        position: relative;
        a {
            color: $palette-text-light !important;              
            text-shadow: 3px 2px 0px $palette-text-blue;
            border-left: 3px solid $palette-text-blue !important;
            padding: 5px 18px !important;
            margin: 10px 0;
            font-size: 2.5em;
        }
      }
    }
}

#nav-sensor {
  position: fixed;
  @extend %nav-height;
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
  align-items: flex-end;
  padding-bottom: 20px;
  &.show {
    @extend %nav-height;
  }
  a {
    cursor: pointer;
    padding: 0 15px;
    font-weight: bold;
    @extend %font-slabo;
    text-decoration: none;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: color 0.3s, border-left 0.3s;
    color: #8c8c8c;
    &.blue {
        color: #e5f4ff
    }
    + a {
      border-left: 2px solid $palette-text-light;
      &.light {
        border-left: 2px solid #ccc;
      }
      &.blue {
        border-left: 2px solid #e5f4ff;
      }
    }
    &.router-link-exact-active {
      color: $palette-text-dark;
      text-shadow: -1px 2px 0px #648a9d;
      &.grey {
          color: #fff;
          text-shadow: -1px 2px 0px $palette-lab-yellow;
      }
      &.blue {
          color: #fff;
          text-shadow: -1px 2px 0px #222;
      }
    }
    &:hover {
      color: $palette-text-dark;
      &.grey, &.blue {
          color: #fff;
      }
    }
  }
}
    
</style>