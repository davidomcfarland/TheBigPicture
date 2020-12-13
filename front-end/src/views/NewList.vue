<template>
  <main>
    <h1>New List</h1>

    <div class="newList">
      <h2>Name:</h2>
      <input class="new" type="text" v-model="newName">
      <h2>Description</h2>
      <input class="new" type="text" v-model="newDescription">
      <h2>Select Root:</h2>
      <table class="new">
        <tbody>
          <tr v-for="topic in topics" :key="topic._id">
            <td @click="select(topic)" :class="{ selected: topic.selected}">{{ topic.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>



    <button  @click.prevent="CreateList()" id="submit" :class="{inProgress: submitting}" v-if="this.root.name != '' && this.newName != ''">Create <strong>{{this.newName}}</strong> with <strong>{{ this.root.name }}</strong> as root</button>

    <div class="success" v-if="success">
      <p>Sucessfully created new list!</p>
      <p class="success-link"><router-link :to=" '/lists/' + this.newName" v-if="success">Click here to see your new list: {{this.newName}}</router-link></p>
      <p>OR</p>
      <a class="success-link" @click.prevent="NewList()" href="#">Create another List</a>
    </div>
    <p class="warning" v-if="warning != ''">{{ warning }}</p>
  </main>
</template>

<style scoped>

  main {
    padding: 0px;
  }

  label, input {
    display: block;
  }

  .new {
    margin-left: 50px;
  }
  table {
    border: 1px solid black;
  }

  table td {
    border: 1px solid black;
    padding: 5px 10px;
  }

  table td:hover {
    background-color: #EEEEEE;
    cursor: pointer;
  }

  table td:active {
    outline: 3px solid black;
  }

  .selected {
    background-color: #EEEEEE;
  }

  #submit {
    display: block;
    margin: 30px auto;
    padding: 5px 10px;
    border-radius: 5px;
  }

  #submit.submitting {
    background-color: #EEEEEE;
  }

  .warning {
    display: block;
    width: 50%;
    margin: 10px auto;
    background-color: pink;
    color: red;
    font-weight: bold;
    outline: 3px solid red;
    text-align: center;
  }

  .inProgress {
    background-color: #CCCCCC;
    text-align: center;
  }

  .newList {
    width: 75%;
    max-width: 600px;
    margin: 20px auto;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    justify-content: space-around;
  }

  .response:empty {
    display: none;
  }

  .success {
    width: 80%;
    max-width: 600px;
    margin: 10px auto 30px;
    padding: 10px;

    text-align: center;

    border: 1px solid black;
    border-radius: 15px;

    background-color: var(--dark);
    color: white;
  }

  .success-link {
    font-weight: bold;
    font-size: 1.5em;
    background-color: RGBA(255, 255, 255, 0.05);
    box-shadow: 0 0 10px 5px RGBA(255, 255, 255, 0.05);
  }

</style>


<script>
  import axios from "axios"

  export default {
    name: "NewList",
    data() {
      return {
        topics: Array,
        root: {
          name: ""
        },
        submitting: false,
        warning: "",
        success: false,
        newName: "",
        newDescription: "",
      }
    },
    created: function() {
      this.getTopics();
    },
    methods: {
      async getTopics() {
        try {
          let topics = await axios.get("/api/topics");

          this.topics = topics.data
        }
        catch (error) {
          console.log(error);
        }
      },
      select(topic) {
        this.root.selected = false;

        this.root = topic;

        this.root.selected = true;

      },
      async CreateList() {
        this.submitting = true;
        this.warning = "";
        console.log("submitting");

        if (this.root.name == "") {
          this.warning = "Please select a root for your new list";
          this.submitting = false;
          console.log("no root");
          return;
        }

        try {
          await axios.post(
            "/api/lists",
            {
              name: this.newName,
              description: this.newDescription,
              rootid: this.root._id,
            }
          );

          this.submitting = false;
          this.success = true;

          return;
        }
        catch (error) {
          console.log(error);
          this.warning = "an error occured";
          this.submitting = false;
        }

      },
      NewList() {
        this.root = {
          name: "",
          description: "",
        };

        this.warning = "";
        this.success = false;
        this.newName = "";
        this.newDescription = "";

        for (let i = 0; i < this.topics.length; i++) {
          this.topics[i].selected = false;
        }
      }
    }
  }
</script>
