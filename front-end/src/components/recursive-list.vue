<template>
  <ul>
    <li v-for="entry in list" :key="entry._id">
      <span v-if="!Array.isArray(entry)">&mdash; {{entry.name}}</span>
      <RecursiveList v-else :list="entry" />
    </li>
  </ul>
</template>

<style scope>
  ul {
    padding: 20px;
  }

  li {
    margin-left: 20px;
    list-style-type: none;
  }

  .addButton {
    border-radius: 20px;
    font-size: 0.8em
  }
</style>

<script>
  export default {
    name: "RecursiveList",
    props: {
      list: Array,
    },
    methods: {
      makeCurrent(topic){
        this.$parent.makeCurrent(topic);
      },
      makePrevCurrent() {
        this.$parent.makePrevCurrent();
      }
    }
  }
</script>
