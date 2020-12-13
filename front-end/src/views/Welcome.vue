<template>
  <main>
    <h1>Welcome!</h1>

    <p>Welcome to The Big Picture. This site will help you organize your mind and sharpen your ability to learn and remember. Here's a brief introduction to the two main objects you will come across.</p>

    <h2>Topics</h2>

    <p>Topics are individual ideas where you can save notes about the details of things that you learn. You can define a topic using descriptions, sources, equations, and more. You can browse all the topics you have built and search for specific ones as you need.</p>

    <h2>Lists</h2>

    <p>Lists are collections of topics that you can arrange to help you visualize a topic. You do this by choosing a "root" topic that will serve as the list's anchor, and then you can point that topic to other topics to create an organized chain</p>

    <p>For example, suppose you create topics called "The Civil Rights Movement", "Martin Luther King Jr", and "Neil Armstrong", and "Famous peple of the 1960's". You could then create a list called "The Civil Rights Movement" anchored on the topic of the same name. Then, you could point that Anchor to "Martin Luther King Jr" and others as it's subtopics.</p>

    <p>Alternatively, you could create a list called "Famous people of the 1960's" that is anchored on the topic of the same node, and points to the topics "Martin Luther King Jr" and "Neil Armstrong". These two different lists will help you organize and synthesize information from different topics, while keeping the information constant throughout all lists.</p>
  </main>
</template>

<style scoped>
  main {
    padding: 0;
  }

  h1 {
    padding: 20px;
    text-align: center;
    background-color: var(--primary);
    color: black;
    box-shadow: 0 5px 5px 1px var(--primary);
    font-weight: 700
  }

  h2 {
    margin-left: 20px;
    text-decoration: underline var(--primary);
  }

  p {
    padding: 5px 20px;
  }
</style>

<script>
  export default {
    name: "Welcome",
  }
</script>
