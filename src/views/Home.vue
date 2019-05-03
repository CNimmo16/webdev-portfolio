<template>
  <div id="home">
    <Intro />
    <Launchpad />
    <Projects />
    <!--<Void />-->
    <Lab />
    <div class="count">{{ currentPage }}</div>
  </div>
</template>

<script>
import Intro from "@/components/Intro.vue"
import Launchpad from "@/components/Launchpad.vue"
import Projects from "@/components/Projects.vue"
import Void from "@/components/Void.vue"
import Lab from "@/components/Lab.vue"

import debounce from 'lodash/debounce';

export default {
  name: 'home',
  components: {
    Intro,
    Launchpad,
    Projects,
    Void,
    Lab
  },
  mounted() {
    this.handleScroll()
  },
  methods: {
    handleScroll() {
      var payload = {
        scrollTop: window.scrollY,
        page: Math.floor((window.scrollY + 40) / window.innerHeight)
      };
      this.$store.commit('setScroll', payload);
      const pages = ["intro", "start", "projects", "lab"]
      window.history.replaceState(null, ("page " + payload.page), "#" + pages[payload.page])
    }
  },
  created() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 20);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  },
  computed: {
    currentPage () {
      return this.$store.state.page
    }
  },
}
</script>

<style lang="scss" scoped>
.count {
  position: fixed;
  top: 30px;
  left: 30px;
  background: #fff;
}  

</style>