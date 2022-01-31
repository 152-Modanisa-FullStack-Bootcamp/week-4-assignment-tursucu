<template>
  <div class="header">
    <router-link class="favorite-button" :to="{name: 'Favorite', params: {userId: 'bootcamp'}}" tag="button">Favorites
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 1.6rem;
  height: 56px;
  width: 100%;
  background: var(--yt-header-bg-color);
  border-bottom: 0.1rem solid var(--yt-spec-10-percent-layer);
}

.favorite-button {
  padding: 1rem 1.6rem;
  background: rgba(0, 0, 0, 0.05);
  color: var(--yt-main-text-color);
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  border: 0.1rem solid var(--yt-spec-10-percent-layer);
  border-radius: 0.4rem;
}

.favorite-button:hover {
  background: var(--yt-spec-10-percent-layer);
}
</style>
