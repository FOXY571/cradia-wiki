<template>
  <div class="panel primary-border">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  backgroundSize: {
    type: String,
    default: '100%',
  },
})
</script>

<style scoped>
.panel {
  background: url('../assets/images/content-background.jpg');
  background-repeat: repeat-y;
  background-size: v-bind(backgroundSize);

  box-shadow: 2.5px 2.5px 10px 0 rgba(10, 10, 10, 0.7);
}

.header {
  background-color: rgba(0, 0, 0, 0.15);

  border-color: rgb(20, 20, 20);
  border-style: solid;
  border-width: 0 0 1px 0;
  border-radius: 5px 5px 0 0;

  font-size: 17px;
  line-height: 10px;

  height: 10px;
  padding: 10px;
}

.content {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
