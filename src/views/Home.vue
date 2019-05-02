<template>
  <div class="home">
    <Intro />
    <Launchpad />
  </div>
</template>

<script>
import Intro from "@/components/Intro.vue"
import Launchpad from "@/components/Launchpad.vue"

export default {
  name: 'home',
  components: {
    Intro,
    Launchpad
  },
  mounted() {
  
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .home {
    background-color: #fff;
    height: 100vh;
  }

</style>