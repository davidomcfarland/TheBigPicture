<template>
  <main id="NewTopic">
    <form id="NewEntry">
      <label>Name:</label>
      <input type="text" v-model="inputName"/>
      <label>Description:</label>
      <textarea v-model="inputDescription"/>
      <label>Parents:</label>
      <input type="text" v-model="inputParents"/>
      <label>Children:</label>
      <input type="text" v-model="inputChildren"/>
      <label>Equations:</label>
      <input type="text" v-model="inputEquations"/>
      <label>Sources:</label>
      <input type="text" v-model="inputSources"/>

      <input type="submit" @click.prevent="addTopic()">
      <p v-text="message"></p>
    </form>

    <section class="preview">
      <h1 v-if="inputName">{{ inputName }}</h1>
      <h1 v-else>New Topic</h1>
      <p>{{ inputDescription }}</p>
      <h2 v-if="inputParents">Parents</h2>
      <ul v-if="inputParents">
        <li v-for="parent in ParentArray" :key="parent">{{ parent}}</li>
      </ul>
      <h2 v-if="inputChildren">Children</h2>
      <ul v-if="inputChildren">
        <li v-for="child in ChildrenArray" :key="child">{{ child }}</li>
      </ul>
      <h2 v-if="inputEquations">Equations</h2>
      <ul v-if="inputEquations">
        <li v-for="equation in EquationArray" :key="equation">\({{ equation }}\)</li>
      </ul>
      <h2 v-if="inputSources">Sources</h2>
      <ul v-if="inputSources">
        <li>{{ inputSources }}</li>
      </ul>


    </section>
  </main>
</template>

<style scoped>
  form {
    display: grid;
    grid-template-columns: 20% 80%;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: auto;
    padding: 15px;
  }

  label, input, textarea {
    padding: 10px;
    margin: 5px;
  }

  label {
    text-align: right;
    padding-right: 5px;
  }

  .preview {
    display: none;
  }

  #NewTopic {
    display: flex;
  }
  
  @media only screen and (min-width: 600px) {
    .preview {
      display: inline-block;
      flex: 50%;
    }

    #NewEntry {
      flex: 50%;
    }
  }

</style>

<script>
  import axios from "axios"
  export default {
    name: "NewTopic",
    data() {
      return {
        inputName: "",
        inputDescription: "",
        inputParents: "",
        inputChildren: "",
        inputEquations: "",
        inputSources: "",

        message: "",
      }
    },
    computed: {
      ParentArray() {
        return this.inputParents.split(",")
      },
      ChildrenArray() {
        return this.inputChildren.split(",")
      },
      EquationArray() {
        return this.inputEquations.split(",")
      },
      SourceArray() {
        return this.inputSources.split(",")
      }
    },
    methods: {
      async addTopic() {
        if (this.inputName == "") {
          return;
        }

        let newTopic = {
          name:        this.inputName,
          description: this.inputDescription,
          parents:     this.ParentArray,
          children:    this.ChildrenArray,
          equations:   this.EquationArray,
          sources:     this.SourceArray,
        };

        try {
          await axios.post(
            "/api/topics",
            newTopic
          );

          this.message = "Successfully Submitted!";

          this.inputName = "";
          this.inputDescription = "";
          this.inputParents = "";
          this.inputChildren = "";
          this.inputEquations = "";
          this.inputSources = "";

          setTimeout(
            () => {
              this.message = "";
            },
            5000
          );

        }
        catch (error) {
          console.log(error);

          this.message = "An error occured, topic not submitted";

          setTimeout(
            () => {
              this.message = "";
            },
            5000
          );
        }
      }
    }
  }
</script>
