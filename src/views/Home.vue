<template>
  <div id="home">
    <!-- <Intro /> -->
    <Launchpad />
    <Projects />
    <Lab />
    <Contact />
  </div>
</template>

<script>
// import Intro from "@/components/home/Intro.vue"
import Launchpad from "@/components/home/Launchpad.vue"
import Projects from "@/components/home/Projects.vue"
import Lab from "@/components/home/Lab.vue"
import Contact from "@/components/home/Contact.vue"

import debounce from 'lodash/debounce';

export default {
  name: 'home',
  components: {
    // Intro,
    Launchpad,
    Projects,
    // Void,
    Lab,
    Contact
  },
  data() {
    return {
      pages: ["start", "projects", "lab", "contact"]
    }
  },
  mounted() {
    const hash = window.location.hash
    if(hash.length > 0 && this.pages.indexOf(hash.slice(1)) > -1) {
      this.$scrollTo(hash)
    } else {
      this.handleScroll()
    }
  },
  methods: {
    handleScroll() {
      const pages = this.pages;
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