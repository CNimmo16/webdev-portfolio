<template>
  <div id="home">
    <Intro />
    <Launchpad />
    <Projects />
    <!--<Void />-->
    <Lab />
    <Contact />
    <!--<div class="count">{{ currentPage }}</div>-->
  </div>
</template>

<script>
import Intro from "@/components/Intro.vue"
import Launchpad from "@/components/Launchpad.vue"
import Projects from "@/components/Projects.vue"
// import Void from "@/components/Void.vue"
import Lab from "@/components/Lab.vue"
import Contact from "@/components/Contact.vue"

import debounce from 'lodash/debounce';

export default {
  name: 'home',
  components: {
    Intro,
    Launchpad,
    Projects,
    // Void,
    Lab,
    Contact
  },
  mounted() {
    this.handleScroll()
  },
  methods: {
    handleScroll() {
      const pages = ["intro", "start", "projects", "lab", "contact"]
      let i = pages.slice().reverse().findIndex((page) => {
        const pagePos = window.document.getElementById(page).getBoundingClientRect().top - window.document.body.getBoundingClientRect().top
        return pagePos < window.scrollY + 40
      })
      var count = pages.length - 1
      var finalIndex = i >= 0 ? count - i : 0;
      var payload = {
        scrollTop: window.scrollY,
        page: finalIndex
      };
      this.$store.commit('setScroll', payload);
      
      window.history.replaceState(null, ("page " + payload.page), "#" + pages[payload.page])
    }
  },
  created() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 20);
    window.addEventListener('scroll', this.handleDebouncedScroll);
    window.addEventListener('resize', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
    window.removeEventListener('resize', this.handleScroll);
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