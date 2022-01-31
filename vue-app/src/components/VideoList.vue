<template>
  <div class="video-list-container">
    <VideoItem
        v-for="video in videos"
        :video="video"
        :key="video.id"
    />
  </div>
</template>

<script>
import API from "@/api";
import VideoItem from "@/components/VideoItem";

export default {
  name: "VideoList",
  components: {VideoItem},

  data() {
    return {
      videos: []
    }
  },
  async created() {
    try {
      this.videos = await API.getVideoList()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
.video-list-container {
  display: flex;
  flex-direction: row;
  gap: 20px 20px;
  flex-wrap: wrap;
  margin: 20px 0;
  justify-content: center;
}
</style>
