<template>
  <div class="relative-container" @mouseover="hoverImage=true" @mouseleave="hoverImage=false">
    <div class="video-container" @click="goToWatchPage">
      <div class="video-image-area">
        <img data-test="coverImage" class="video-image" :src="video.coverImage">
        <img data-test="hoverImage" class="video-image video-hover" :src="video.hoverImage" v-if="hoverImage">
      </div>
      <div class="video-description-area">
        <div class="video-brand-image">
          <img data-test="ownerImage" :src="video.ownerImage">
        </div>
        <div class="video-meta-area">
          <h3 class="video-title">{{ video.title }}</h3>
          <span class="video-owner">{{ video.ownerName }}</span>
          <div class="video-count">
            <span data-test="count" class="video-views">{{ video.viewCount }} views</span>
            <span data-test="date" class="video-views">{{ video.publishDateInMonth }} months ago</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Favorite Button -->
    <div @click="favoriteToggle" :class="[favoriteBtnStyle,'favorite-button']">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path v-show="favoriteVideo"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <path
            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "VideoItem",
  props: {
    isFavorite: Boolean,
    video: {
      id: Number,
      coverImage: String,
      hoverImage: String,
      description: String,
      ownerImage: String,
      ownerName: String,
      publishDateInMonth: Number,
      title: String,
      videoAddress: String,
      viewCount: Number
    }
  },
  data() {
    return {
      hoverImage: false,
      favoriteVideo: this.isFavorite
    }
  },
  computed: {
    ...mapState(["favorites"]),
    favoriteBtnStyle() {
      if (this.favoriteVideo) {
        return 'favorite-button-active'
      }
      return
    }
  },
  methods: {
    //  addOrRemoveFavorite add or remove via vuex with the function.
    favoriteToggle() {
      this.favoriteVideo = !this.favoriteVideo
      this.$store.dispatch('addOrRemoveFavoriteAction', {
        video: this.video,
        isFavorite: this.favoriteVideo,
      })
    },
    goToWatchPage() {
      this.$router.push(`/watch?id=${this.video.id}`)
    }
  }
}
</script>

<style scoped>
.relative-container {
  position: relative;
}

/*Video Container*/
.video-container {
  display: flex;
  flex-direction: column;
  width: 360px;
  cursor: pointer;
}

/*Video Image Section*/
.video-image-area {
  position: relative;
  width: inherit;
  height: 200px;
}

.video-image {
  width: 100%;
  height: 100%;
}

.video-hover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}

/*Video Meta Area*/
.video-description-area {
  display: flex;
  width: 100%;
  margin-top: 12px;
}

.video-brand-image {
  display: flex;
  width: 36px;
  height: 36px;
  margin-right: 12px;
}

.video-brand-image img {
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.video-meta-area {
  display: flex;
  flex-direction: column;
  padding-right: 24px;
  width: calc(100% - 48px);
}

.video-title {
  width: 100%;
  margin-bottom: 4px;
  font-size: 1.6rem;
  line-height: 2.2rem;
  max-height: 2.2rem;
  color: var(--yt-main-text-color);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.video-owner, .video-views {
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 400;
  color: var(--yt-brand-text-color)
}

.video-count {
  display: flex;
  flex-direction: row;
}

.video-views:first-child:after {
  content: "•";
  margin: 0 4px;
}

/*Favorite Button*/
.favorite-button {
  position: absolute;
  padding: 3px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  top: 3px;
  right: 3px;
  background: var(--yt-spec-70-percent-layer);
  border: none;
  border-radius: 3px;
  z-index: 100;
  color: var(--yt-white);
  cursor: pointer;
}

.favorite-button-active, .favorite-button:hover {
  color: var(--yt-red);
}

.favorite-button svg {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
</style>
