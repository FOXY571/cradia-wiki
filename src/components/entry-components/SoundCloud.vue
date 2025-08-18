<template>
  <div height="100%" style="display: flex; align-items: center">
    <iframe
      width="100%"
      height="20"
      :src="`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/${songId}&inverse=false&auto_play=false&show_user=false`"
      frameborder="0"
      allow="autoplay"
      title="soundcloud"
      referrerpolicy="no-referrer"
    ></iframe>
  </div>
</template>

<script setup>
defineProps({
  songId: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
iframe {
  filter: invert(1) hue-rotate(225deg);
}
</style>
