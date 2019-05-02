<template>
  <div class="intro">
    <p id="typewriter"></p>
  </div>
</template>

<script>

export default {
  name: 'intro',
  components: {
  },
  mounted() {
    var tl = this.$anime.timeline({
      easing: 'easeOutExpo',
      duration: 750,
    });
    new this.$typeit('#typewriter', {
      speed: 80,
      deleteSpeed: 80,
      waitUntilVisible: true,
      lifeLike: true,
      html: true,
      cursorChar: "|",
      afterComplete: () => {
        document.getElementsByClassName("ti-cursor")[0].classList.add("block");
        document.getElementsByClassName("ti-cursor")[0].style.width = "0.2ch";
        window.setTimeout(() => {
          tl.add({
            targets: document.getElementsByClassName("ti-cursor")[0],
            left: "300px"
          })
          .add({
            targets: document.getElementsByClassName("ti-cursor")[0],
            width: "100vw",
            height: "50vh",
            translateX: "-50vw",
            duration: 1000,
            easing: "easeOutQuart"
          })
          .add({
            targets: document.getElementsByClassName("ti-cursor")[0],
            opacity: 0,
            duration: 1000,
            delay: 500
          })
          // .add({
          //   targets: document.getElementsByClassName("ti-cursor")[0],
          //   height: 20,
          //   duration: 10
          // });
        }, 300)
        window.setTimeout(() => {
          var count = 0;
          const max = window.document.body.clientHeight / 10;
          const int = window.setInterval(() => {
            if(count < max) {
              window.scrollBy(0, 10)
              count ++
            } else {
              window.clearInterval(int)
            }
          }, 10)
        }, 1800);
      }
    })
    .exec(async() => {
      document.getElementsByClassName("ti-cursor")[0].style.left = "-0.8ch";
    })
    .type('<span style="color: #cc99cd;">var </span>').pause(50).type('c_nimmo <span style="color: #67cdcc">= </span>').pause(50).type('<span style="color: #cc99cd;">junior </span>').pause(100).type('<span style="color: #f8c555">WebDeveloper()</span> {').break().pause(200).type('<span style="color: #f08d49; padding-left: 4ch;">return </span>').pause(300).type('<span style="color: #a9eca6">"dedicated"</span><span style="color: #fff">;</span>').pause(700).delete(12).pause(200).type('<span style="color: #a9eca6">"versatile"</span><span style="color: #fff">;</span>').pause(700).delete(12).pause(200).type('<span style="color: #a9eca6">"an eye for design"</span><span style="color: #fff">;</span>').pause(500).break().pause(200)
    .type('}')
    // .pause(500)
    .exec(async() => {
      document.getElementsByClassName("ti-cursor")[0].style.animation = "none";
      document.getElementsByClassName("ti-cursor")[0].style.WebkitAnimation = "none";
      return "go"
    })
    // .pause(200)
    .go();
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .intro {
    background-color: #282c34;
    height: 100vh;
  }
  #typewriter {
    margin: 0 auto;
    position: relative;
    top: 40vh;
    min-height: 4em;
    height: 20vh;
    text-align: left;
    line-height: 1.25;
    width: 600px;
    background-color: #282c34;
    padding: 10px;
    color: #fff;
    font-size: 1.6em;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    a {
      color: #fff;
      cursor: pointer;
    }
  }
  
  .ti-cursor {
    font-size: 1.1em !important;
    top: -2px;
    &.block {
      display: block !important;
      background-color: #fff;
      left: 0;
      top: 3px;
      color: #282c34 !important;
    }
  }
  
  #letsgo {
    position: relative;
    top: 200vh;
  }
</style>