<template>
  <div class="container">
    <Header/>
    <VideoList/>
  </div>
</template>

<script>
import Header from "@/views/Header";
import VideoList from "@/components/VideoList";

export default {
  name: "HomePage",
  components: {Header, VideoList},
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
}
</style>
