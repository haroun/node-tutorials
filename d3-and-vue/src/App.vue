<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <PackChart :tweetData="loadData" />
  </div>
</template>

<script>
import * as d3 from 'd3'
import PackChart from './chart/PackChart.vue'

export default {
  name: 'app',
  components: {
    PackChart
  },
  data() {
    return {
      loadData: []
    }
  },
  mounted() {
    console.log('App loaded')
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loadData = await d3.json('./tweets.json')
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
