<template lang="html">
  <div>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'rating',
  data () {
    return {
      title: 'Rating'
    }
  },
  props: {
    maxStars: Number,
    grade: Number
  }
}
</script>

<style lang="css" scoped>
</style>
