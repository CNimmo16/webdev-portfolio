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
    var qualities = ['"cutting edge web apps"', '"quality code"', '"slick design"']
    new this.$typeit('#typewriter', {
      speed: 80,
      deleteSpeed: 20,
      waitUntilVisible: true,
      lifeLike: true,
      html: true,
      cursorChar: "|"
    })
    .exec(async() => {
      var cursor = document.getElementsByClassName("ti-cursor")[0];
      if(typeof cursor !== "undefined") {
        cursor.style.left = "-0.8ch";
      }
    })
    // .type('<span style="color: #cc99cd;">var </span>').pause(50)
    .type('cameron_nimmo <span style="color: #67cdcc">= </span>').pause(50)
    .type('<span style="color: #cc99cd;">fullStack </span>').pause(100)
    .type('<span style="color: #f8c555">WebDeveloper()</span> {')
    .break().pause(200)
    .type('<span style="color: #f08d49; padding-left: 4ch;">I make </span>').pause(300)
    .type('<span style="color: #a9eca6;">' + qualities[0] + '</span><span style="color: #fff">;</span>').pause(700)
    .delete(qualities[0].length+("I make ".length)+1).pause(200)
    .type('<span style="color: #f08d49; padding-left: 4ch;">with </span>').pause(300)
    .type('<span style="color: #a9eca6">' + qualities[1] + '</span><span style="color: #fff">;</span>').pause(700)
    .delete(qualities[1].length+("with ".length)+1).pause(200)
    .type('<span style="color: #f08d49; padding-left: 4ch;">and </span>').pause(300)
    .type('<span style="color: #a9eca6; position: relative;" class="quality-item" ref="quality">' + qualities[2] + '</span><span style="color: #fff">;</span>')
    .pause(200)
    .break()
    .type('}')
    .pause(500)
    .exec(async() => {
      var cursor = document.getElementsByClassName("ti-cursor")[0];
      if(typeof cursor !== "undefined") {
        cursor.style.animation = "none";
        cursor.style.WebkitAnimation = "none";
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
            return "go"
            // var elem = window.document.getElementsByClassName('quality-item')[0]
            // elem.nextSibling.style.opacity = 0;
            // elem.previousSibling.style.display = "inline-block"
            // elem.previousSibling.style.transform = "translateY(-6px)"
            // elem.style.color = "#282c34"
            // elem.style.display = "inline-block"
            // elem.style.left = "1ch"
            // elem.style.overflow = "hidden"
            // for(var i=0; i<3; i++) {
            //   var span = document.createElement("span")
            //   span.classList.add("quality-child")
            //   span.style.color="#a9eca6"
            //   span.style.position="absolute"
            //   span.style.left="0"
            //   span.innerText = qualities[i]
            //   span.style.opacity = 0
            //   elem.appendChild(span)
            // }
          }
        }, 1300);
      }
    })
    .pause(3000)
    .go();
  },
  methods: {
  }
}
</script>

<style lang="scss">

  #typewriter {
    margin: 0 auto;
    box-sizing: border-box;
    min-height: 4em;
    height: 20vh;
    text-align: left;
    line-height: 1.25;
    max-width: 100%;
    padding: 10px;
    color: #fff;
    width: 320px;
    font-size: 3.3vw;
    width: calc(75vw + 50px);
    @media only screen and (min-width: 690px) {
      font-size: 24px;
      width: 570px;
    }
    letter-spacing: 1px;
    font-family: "Inconsolata", monospace;
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

  @keyframes rotateWords {
    0% { 
      opacity: 0;
      transform: translateY(30px)
    }
    12% { 
      opacity: 1; 
      transform: translateY(0);
    }
    35% { 
      opacity: 1; 
      transform: translateY(0);
    }
    45% { 
      opacity: 0; 
      transform: translateY(-30px)
    }
    100% { 
      opacity: 0; 
      transform: translateY(30px)
    }
  }

  .quality-child {
    animation: rotateWords 4s linear infinite 0s;
    &:nth-child(2) { 
      animation-delay: 1.333s; 
    }
    &:nth-child(3) { 
      animation-delay: 2.666s; 
    }
  }
</style>