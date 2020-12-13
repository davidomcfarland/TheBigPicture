<template>
  <main>
    <section id="warn" v-if="topics.length == 0">
      <p>It looks like you haven't added any Topics yet. Before you can make lists, you need to create some new topics</p>
      <router-link class="newButton" to="/topics/new"><span>+</span>Create New Topic</router-link>
    </section>
    <section v-else>
      <router-link class="newButton" to="/lists/new"><span>+</span>Create New List</router-link>
      <article v-for="list in lists" :key="list._id">
        <router-link :to=" '/lists/' + list.name"><h1>{{list.name}}</h1></router-link>
        <p>{{list.description}}</p>
        <button class="delete" @click="deleteList(list)">x</button>
      </article>
    </section>
  </main>
</template>

<style scope>
  main {
    padding: 20px;
  }

  article {
    width: 95%;
    max-width: 600px;
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


  .newButton {
    padding: 5px 10px;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 30%;
    border: 1px solid black;
    border-radius: 15px;
  }

  .newButton span {
    font-size: 1.5em;
    vertical-align: center;
  }

  a.newButton:hover {
    text-decoration: inherit;
    color: inherit;
    background-color: #EEE
  }

  #warn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    height: 100%;
    margin: auto;
  }
</style>

<script>
  import axios from "axios"

  export default {
    name: "BrowseLists",
    data() {
      return {
        lists: Array,
        topics: Array,
      }
    },
    created: function() {
      this.getItems();
      this.getLists();
    },
    methods: {
      async getLists() {
        try {
          let lists = await axios.get("/api/lists");

          this.lists = lists.data;
        }
        catch (error) {
          console.log(error);
        }
      },
      async deleteList(list) {
        try {
          await axios.delete("/api/lists/" + list._id);
          this.getLists();
        }
        catch (error) {
          console.log(error)
        }
      },
      async getItems() {
        try {
          let topics = await axios.get("/api/topics");
            this.topics = topics.data;
          }
        catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>
