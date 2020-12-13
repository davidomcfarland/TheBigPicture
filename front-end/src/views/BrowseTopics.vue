<template>
  <main>
      <router-link class="newButton" to="/topics/new"><span>+</span>Create New Topic</router-link>
    <article v-for="topic in topics" :key="topic.id">
      <router-link :to="'/topics/' + topic.name"><h1>{{topic.name}}</h1></router-link>
      <p>{{topic.description}}</p>
      <button class="delete" @click="deleteTopic(topic)">x</button>
    </article>
  </main>
</template>

<style scoped>
  main {
    padding: 20px;
  }

  article {
    width: 95%;
    height: 20vh;
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px auto;

    padding: 10px;

    position: relative;
  }

  article p {
    font-size: 1em;
    height: 1.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  article .delete {
    display: none;
    position: absolute;
    border-radius: 10px;
    top: 0;
    right: 0;
    background-color: pink;
    font-weight: bold;
  }

  article:hover .delete {
    display: block;
  }
</style>

<script>
  import axios from 'axios'

  export default {
    name: "BrowseTopics",
    data() {
      return {
        topics: Array
      }
    },
    created: function() {
      this.getItems();
    },
    methods: {
      async getItems() {
        try {
          let topics = await axios.get("/api/topics");

          this.topics = topics.data;
        }
        catch (error) {
          console.log(error)
        }
      },
      async deleteTopic(topic){
        try {
          await axios.delete("/api/topics/ById/"+ topic._id);

          await this.getItems();
        }
        catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>
