<template>
  <div id="body">

    <RecursiveList :list="list"/>

    <form>
      <label for="newNode">Add Child to {{list[0].name}}:</label>
      <input type="text" v-model="newNode" @keyup="getHint">
      <div id="hint" v-if="hintArray.length != 0" >
        <ul class="optionTable">
          <li class="option" v-for="hint in hintArray" :key="hint.name" v-text="hint.name" @click="SetNewNodeId(hint.id, $event)"/>
        </ul>
      </div>
      <input type="submit" @click.prevent="addChild">
    </form>
  </div>
</template>

<style scope>
  h1 {
    padding-left: 15px;
  }

  .optionTable {
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 400px;
    margin: auto;
    border: 1px solid black;
    border-radius: 10px;
  }

  .option {
    display: block;
    margin-left: none;
    padding: 10px;
    border-radius: inherit;
  }

  .option:nth-child(2n+1) {
    background-color: #DDDDDD
  }

  .option:hover {
    background-color: #BBBBBB
  }

  .selected {
    background-color: #BBBBBB!important;
  }

</style>

<script>
  import axios from "axios"
  import RecursiveList from "@/components/recursive-list.vue"

  export default {
    name: "Detail",
    data() {
      return {
        newNode: "",
        hintArray: Array(),
        newNodeId: String,
        list: [
          this.$parent.root
        ],
      }
    },
    components: {
      RecursiveList
    },
    created: async function() {
      await this.getThree();
    },
    mounted: async function() {
      await this.getThree();
    },
    methods: {
      async getHint() {
          if (this.newNode == ""){
            return "";
          }

          try {
            let url = "/api/topics/hint/" + this.newNode;

            let hints = await axios.get(url);

            this.hintArray = hints.data;
          }
          catch (error) {
            console.log(error)
          }
      },
      SetNewNodeId(id, e) {
        this.newNodeId = id;

        let optionTable = document.getElementsByClassName("optionTable")[0];
        console.log(optionTable);
        console.log(optionTable.childNodes);

        e.target.className += " selected"
      },
      async addChild() {
        try {
          await axios.post(
            "/api/nodes",
            {
              parentid: this.$parent.currentNode._id,
              childid:  this.newNodeId,
            }
          );

          this.getThree();
        }
        catch (error) {
          console.log(error);
        }
      },
      async getThree() {
        try {
          let url = "/api/nodes/3/" + this.$parent.currentNode._id;
          let list = await axios.get(url);

          this.list = await list.data;
        }
        catch (error) {
          console.log(error);
        }
      },
      async makeCurrent(topic){
        await this.$parent.setCurrent(topic);
        this.getThree();
      },
      async makePrevCurrent() {
        await this.$parent.setPrevCurrent();
        this.getThree();
      }
    },
  }
</script>
