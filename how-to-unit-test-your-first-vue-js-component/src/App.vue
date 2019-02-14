<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <rating/>
  </div>
</template>

<script>
import rating from './rating/rating.vue'

export default {
  name: 'app',
  components: {
    rating
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
