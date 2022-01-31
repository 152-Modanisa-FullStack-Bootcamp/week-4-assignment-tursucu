<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
}
</style>
<script>
import Header from "@/views/Header";

export default {
  components: {Header}
}
</script>
