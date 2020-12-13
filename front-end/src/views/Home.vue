<template>
  <main>
    <h1 id="Title">The Big Picture</h1>

    <figure id="globe">
      <img src="@/assets/Earth.jpg" />
    </figure>

    <section id="CTA">
      <router-link class="CTAbutton" to="/welcome">Try the new powerful visualization tool.</router-link>
    </section>



    <section id="Description">
      <p>Organize your mind.</p>
    </section>
  </main>
</template>

<style scoped>

  main {
    background-color: var(--tertiary);
    background-color: #130D21;
    color: white;
  }

  main figure img {
    border-radius: 50%;
    box-shadow: 0 0 20px 5px RGBA(255, 255, 255, 0.5);
    position: relative;
    top: 0;
    z-index: 2;
  }

  section#CTA .CTAbutton {
    background-color: var(--primary);
    color: black;
    flex: 20%;
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    margin: 15px;
  }

  section#CTA:hover .CTAbutton {
    border: 2px solid var(--gray-dark);
    cursor: pointer;
  }

  section#CTA:active .CTAbutton {
    background-color: var(--gray-dark);
    color: white;
  }

  p#popup {
    display: none;
  }

  section#CTA:active p {
    background-color: black;
    color: white;
  }

  @media only screen and (max-width: 500px) {
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      overflow-y: scroll;
    }

    main figure img {
      width: 80vw;
      height: 80vw;
      position: fixed;
      top: 20vh;
      left: 10vw;
    }

    main h1 {
      width: 40vw;
      height: 40vw;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      top: calc(20vh + 20vw);
      left: 30vw;
      z-index: 1;
      padding: 15px;
      text-align: center;
      background-color: RGBA(255, 255, 255, 0.5);
      font-size: 2em;
    }

    main section#CTA {
      width: 64vw;
      position: fixed;
      top: calc(20vh + 80vw + 10vh);
      left: 18vw;
      padding: 15px;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    main section#Description {
      display: none !important;
    }
  }

  @media only screen and (min-width: 501px) and (max-width: 960px) {
    figure {
      grid-area: image;
      display: flex;
    }

    img {
      width: 80%;
      height: auto;
      margin: auto;
    }

    h1 {
      grid-area: title;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    section#Description {
      grid-area: descr;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }

    section#CTA {
      grid-area: _CTA_;
      display: flex;
      align-items: center;
    }

    main {
      width: 100vw;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(12, 1fr);
      grid-template-areas:
        "image image image image image image title title title title title title "
        "image image image image image image title title title title title title "
        "image image image image image image title title title title title title "
        "image image image image image image title title title title title title "
        "image image image image image image _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ "
        "image image image image image image _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ "
        "image image image image image image _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ "
        "image image image image image image _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ "
        "image image image image image image _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ _CTA_ "
        "  .     .     .   descr descr descr descr descr descr   .     .     .   "
        "  .     .     .   descr descr descr descr descr descr   .     .     .   "
        "  .     .     .   descr descr descr descr descr descr   .     .     .   "
        "  .     .     .   descr descr descr descr descr descr   .     .     .   "
    }
  }

  @media only screen and (min-width: 961px) {
    figure#globe {
      grid-area: image;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    img {
      width: min(80%, 50vh)
    }

    h1 {
      grid-area: title;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    section#Description {
      grid-area: descr;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }

    section#CTA {
      grid-area: _CTA_;
      display: flex;
      align-items: center;
    }

    section#CTA p {
      flex: 20%;
    }

    main {
      width: 100vw;
      height: 80vmin;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(5, 1fr);
      grid-template-areas:
        "title title title title title"
        "  .   image image image   .  "
        "  .   image image image   .  "
        "  .   image image image   .  "
        "_CTA_ _CTA_ descr descr descr";
    }
  }

</style>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {}
}
</script>
