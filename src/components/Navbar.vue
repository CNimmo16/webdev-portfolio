<template>
    <div id="navbar">
        <div id="nav-sensor" @mouseenter="moused = true"  :class="{ fullscreen: fullscreenSensor }"></div>
        <div id="nav" :class="{ show: showNav }" @mouseleave="moused = false">
            
            <a v-if="isHome" :class="{ dark: isNavDark(), 'router-link-exact-active': currentPage === 1 }" v-scroll-to="'#start'">Home</a>
            <router-link v-else :class="{ dark: isNavDark() }" to="/">Home</router-link>
            
            <a v-if="isHome" :class="{ dark: isNavDark(), 'router-link-exact-active': currentPage === 2 }" v-scroll-to="'#projects'">Projects</a>
            <router-link v-else :class="{ dark: isNavDark() }" to="/#projects">Projects</router-link>
            
            <a v-if="isHome" :class="{ dark: isNavDark(), 'router-link-exact-active': currentPage === 3 }" v-scroll-to="'#lab'">Experiments</a>
            <router-link v-else :class="{ dark: isNavDark() }" to="/#projects">Experiments</router-link>
            
            <router-link :class="{ dark: isNavDark() }" to="/blog">Blog</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "navbar",
    data() {
        return {
            moused: false,
            isHome: true
        }
    },
    mounted() {
        this.isHome = (this.$router.currentRoute.name === "home") ? true : false;
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
                if(this.scrollTop < 30) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        fullscreenSensor() {
            return (this.$store.state.page === 0) ? true : false;
        }
    },
    watch: {
        '$route.name' (to, from) {
            this.isHome = (to === "home") ? true : false;
        }
    },
    methods: {
        isNavDark() {
            switch(this.currentPage) {
                case 0:
                    return false;
                case 1:
                    return true;
                case 2:
                    return false;
                case 3:
                    return true;
            }
        }
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
    @extend %nav-height;
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
    color: $palette-secondary;
    font-weight: bold;
    @extend %font-slabo;
    text-decoration: none;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: color 0.3s, border-left 0.3s;
    &.dark {
        /*color: #000;*/
    }
    &.router-link-exact-active {
      color: #fff;
      &.dark {
          color: $palette-primary;
      }
    }
    &:hover {
      color: #fff;
      &.dark {
          color: #000;
      }
    }
    + a {
      border-left: 2px solid #fff;
      &.dark {
          border-left: 2px solid #000;
      }
    }
  }
}
    
</style>