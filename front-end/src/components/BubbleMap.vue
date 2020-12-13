<template>
  <section id="artboard" @mousemove.prevent="drag" @mouseup.prevent="stopDrag">
    <p @mousedown.prevent="startDrag" class="root circle">{{list[0].name}}</p>
    <p style="position:relative; top: 30vmin">This page just shows a proof-of-concept. Eventually, this page will show all the nodes and you'll be able to arrange them visually. Feel free to drag around this node</p>
  </section>
</template>

<style>
  #artboard {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    padding: 30px;
  }

  .circle {
    border: 1px solid black;
    border-radius: 50%;
    height: 25vmin;
    width: 25vmin;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    position: absolute;
    top: 0;
    z-index: 9;
  }

  .circle:active {
    cursor: grabbing;
  }
</style>

<script>
  import axios from "axios"
  export default {
    name: "BubbleMap",
    data() {
      return {
        dragElement: null,
        dragPos: [0, 0, 0, 0],
        list : [
          this.$parent.root
        ],
      }
    },
    created: async function() {
      await this.getThree();
    },
    mounted: async function() {
      await this.getThree();
    },
    methods: {
      startDrag(e) {
        console.log("start drag" + e.target);
        this.dragElement = e.target;

        this.dragPos[2] = e.clientX;
        this.dragPos[3] = e.clientY;
      },
      drag (e) {
        if (this.dragElement == null) {
          return
        }

        this.dragPos[0] = this.dragPos[2] - e.clientX;
        this.dragPos[1] = this.dragPos[3] - e.clientY;
        this.dragPos[2] = e.clientX;
        this.dragPos[3] = e.clientY;

        let top  = this.dragElement.offsetTop  - this.dragPos[1];
        let left = this.dragElement.offsetLeft - this.dragPos[0];

        this.dragElement.style.top  = top + "px";
        this.dragElement.style.left = left + "px";
      },
      stopDrag() {
        console.log("stop drag");
        this.dragElement = null
      },
      async getThree() {
        try {
          let url = "/api/nodes/3/" + this.$parent.currentNode._id;
          let list = await axios.get(url);

          this.list = list.data;
        }
        catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>
