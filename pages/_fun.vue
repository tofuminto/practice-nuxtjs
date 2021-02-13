<template>
  <h1> {{this.fun}} </h1>
</template>

<script>
  export default {
    async asyncData({ params }) {
      const fun = params.fun
      return { fun }
    }
  }
</script>