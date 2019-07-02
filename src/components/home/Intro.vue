<template>
  <section id="intro" class="section section--dark section--floating">
    <p id="typewriter"></p>
  </section>
</template>

<script>

export default {
  name: 'intro',
  components: {
  },
  mounted() {
    var tl = this.$anime.timeline({
      easing: 'easeOutExpo',
      // duration: 750,
    });
    var qualities = ['"versatile"', '"dependable"', '"an eye for design"']
    new this.$typeit('#typewriter', {
      speed: 80,
      deleteSpeed: 80,
      waitUntilVisible: true,
      lifeLike: true,
      html: true,
      cursorChar: "|",
      afterComplete: () => {
        var cursor = document.getElementsByClassName("ti-cursor")[0];
        if(typeof cursor !== "undefined") {
          cursor.classList.add("block");
          cursor.style.width = "2px";
          cursor.style.height = "27px";
          cursor.innerText = "";
          cursor.style.backgroundColor = "#fff";
          const startPoint = (window.innerWidth / 2) - (document.getElementById("typewriter").offsetLeft)
          const endPoint = ((document.getElementById("typewriter").offsetLeft) + (window.innerWidth * 0.1)) * -1
          window.setTimeout(() => {
            tl.add({
              targets: cursor,
              translateX: startPoint,
              translateY: "+=15px",
              duration: 500
            })
            .add({
              targets: cursor,
              width: "120vw",
              height: "60vh",
              backgroundColor: "#75a0b5",
              translateX: endPoint,
              duration: 1000,
              easing: "easeOutQuart"
            })
            .add({
              targets: cursor,
              opacity: 0,
              duration: 1000,
              delay: 500
            })
          }, 300)
          window.setTimeout(() => {
            if(window.scrollY < (window.innerHeight / 3)) {
              this.$scrollTo(document.getElementById("start"), 1000)
            }
          }, 1300);
        }
      }
    })
    .exec(async() => {
      var cursor = document.getElementsByClassName("ti-cursor")[0];
      if(typeof cursor !== "undefined") {
        cursor.style.left = "-0.8ch";
      }
    })
    .type('<span style="color: #cc99cd;">var </span>').pause(50).type('c_nimmo <span style="color: #67cdcc">= </span>').pause(50).type('<span style="color: #cc99cd;">fullStack </span>').pause(100).type('<span style="color: #f8c555">WebDeveloper()</span> {').break().pause(200).type('<span style="color: #f08d49; padding-left: 4ch;">return </span>').pause(300).type('<span style="color: #a9eca6">' + qualities[0] + '</span><span style="color: #fff">;</span>').pause(700).delete(qualities[0].length+1).pause(200).type('<span style="color: #a9eca6">' + qualities[1] + '</span><span style="color: #fff">;</span>').pause(700).delete(qualities[1].length+1).pause(200).type('<span style="color: #a9eca6">' + qualities[2] + '</span><span style="color: #fff">;</span>')
    .pause(200)
    .break()
    // .pause(200)
    .type('}')
    // .options({
    //   cursorSpeed: 0
    // })
    .pause(500)
    .exec(async() => {
      var cursor = document.getElementsByClassName("ti-cursor")[0];
      if(typeof cursor !== "undefined") {
        cursor.style.animation = "none";
        cursor.style.WebkitAnimation = "none";
      }
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
  #typewriter {
    margin: 0 auto;
    /*position: relative;*/
    /*top: 40vh;*/
    min-height: 4em;
    height: 20vh;
    text-align: left;
    line-height: 1.25;
    max-width: 100%;
    width: 26em;
    padding: 10px;
    color: #fff;
    font-size: 1em;
    @include mq("small-phone") {
      font-size: 1.2em;
    }
    box-sizing: border-box;
    @include mq("phone") {
      font-size: 1.6em;
    }
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