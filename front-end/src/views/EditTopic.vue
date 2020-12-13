<template>
  <div class="about">
    <div class="pageHead">
      <h1 class="pageHead"><input class="editArea" v-model="name"/></h1>
      <a class="saveButton" @click.prevent="save">Save</a>
    </div>

    <div id="body">
      <textarea class="editArea" v-model="topic.description" align="center"></textarea>

      <h2 v-if="topic.parents != ''">Parents</h2>
      <ul>
        <li v-for="parent in topic.parents" :key="parent">{{parent}}</li>
      </ul>
      <h2 v-if="topic.children != ''">Children</h2>
      <ul >
        <li v-for="child in topic.children" :key="child">{{child}}</li>
      </ul>
      <h2 v-if="topic.equations != ''">Equations</h2>
      <ul v-if="topic.equations != ''">
        <li v-for="equation in topic.equations" :key="equation">\({{ equation }}\)</li>
      </ul>
      <h2 v-if="topic.sources != ''">Sources</h2>
      <ul v-if="topic.sources != ''">
        <li v-for="source in topic.sources" :key="source">{{ source }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pageHead {
    position: relative;
  }

  .editArea {
    all: inherit;
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .about {
    width: 100%;
    padding: 0;
  }

  #body {
    padding: 20px;
  }

  .saveButton {
    cursor: pointer;
    position: absolute;
    top: 2vmin;
    right: 2vmin;

    padding: 5px 20px;
    color: inherit;

    background-color: #CCC;

    border-radius: 15px;
  }
</style>

<script>
  import axios from "axios";

  export default {
    name: "Topic",
    props: {
      name
    },
    data() {
      return {
        topic: {}
      }
    },
    created: function() {
      this.getTopic()
    },
    methods: {
      async getTopic() {
        try {
          let topic = await axios.get("/api/topics/ByName/"+ this.name);

          if (topic.data.length == 0) {
            alert("Topic does not exist")
            return;
          }
          else if (topic.data.length != 1){
            alert("duplicate topics")
            return;
          }
          else {
            this.topic = topic.data[0];
          }
        }
        catch (error) {
          console.log(error);
        }
      },
      async save() {
        try {
          this.topic.name = this.name;

          await axios.put("/api/topics/ById", this.topic);

          document.location.href = "/topics/" + this.name
        }
        catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>
