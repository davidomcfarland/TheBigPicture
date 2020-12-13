<template>
  <main id="list">
    <h1 class="pageHead">{{name}}</h1>

    <nav id="viewSelector">
      <ul>
        <li class="padding">|</li>
        <li class="tab" @click="selectTab(0)" :class="{ activeTab: tabBools[0] }" >Add</li>
        <li class="tab" @click="selectTab(1)" :class="{ activeTab: tabBools[1] }" >Map</li>
        <li class="padding">|</li>
      </ul>
    </nav>

    <section class="ListRepresentation">
      <Detail     class="model"      v-if="activeTab == 0" />
      <BubbleMap  class="model" v-else-if="activeTab == 1" />
    </section>


  </main>
</template>

<style scoped>

  main#list {
    width: 100%;
    padding: 0
  }

  main#list > h1 {
    text-align: center;
    padding: 20px;
    position: sticky;
  }

  #viewSelector {
    width: 100%;
    background-color: var(--dark);
    color: white;
  }

  #viewSelector ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0px;
  }

  .padding {
    color: var(--dark);
    cursor: default;
  }

  #viewSelector ul li {
    display: inline;
    height: 100%;
    width: 25%;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
  }

  #viewSelector ul li:hover.tab {
    cursor: pointer;
    background-color: #ccc;
  }

  #viewSelector .activeTab {
    background-color: var(--background);
    border: 1px solid black;
    border-bottom: var(--background);
    color: var(--font);
  }

  .ListRepresentation {
    width: 90%;
    margin: auto;
  }
</style>

<script>
  import axios from "axios";

  import Detail from "@/components/Detail.vue";
  import BubbleMap from "@/components/BubbleMap.vue";

  export default {
    name: "List",
    props: {
      name: String,
    },
    components: {
      Detail,
      BubbleMap,
    },
    data() {
      return {
        activeTab: 0,
        root : {
          name: ""
        },
        currentNode : {
          name: ""
        },
        prevNode : {
          name: ""
        }
      }
    },
    created: async function() {
      await this.getRoot();
    },
    computed: {
      tabBools() {
        let tabBools = [];
        for (let i=0; i<3; i++) {
          if (i == this.activeTab) {
            tabBools[i] = true;
          }
          else {
            tabBools[i] = false;
          }
        }
        return tabBools;
      }
    },
    methods: {
      async getRoot() {
        try {
          let root = await axios.get("/api/lists/" + this.name + "/root");

          if (root.data[0] == null) {
            return;
          }
          this.root        = root.data[0];
          this.currentNode = this.root;
        }
        catch (error) {
          console.log(error);
        }
      },
      selectTab(ind) {
        this.activeTab = ind;
      },
      async setCurrent(entry){
        try {
          let node  = await axios.get("/api/nodes/ByName/" + entry.name)
          console.log(node.data);
          this.currentNode = node.data;
        }
        catch (error) {
          console.log(error);
        }
      },
      async setPrevCurrent(){
        console.log(this.currentNode);
        let node = await axios.get("/api/nodes/ById/" + this.currentNode.prev[0]);
        this.currentNode = node.data;
      }
    }
  }
</script>
