<template>
  <header>
    <div class="header-title">
      <a title="Visit the main page" href="/">
        <img src="../assets/images/logo.png" :alt="`${config.wikiName} Wiki logo`" />
      </a>
    </div>
    <div class="header-buttons">
      <ThemeChanger />
    </div>
  </header>
</template>

<script setup>
import config from '../config'

import ThemeChanger from './ThemeChanger.vue'
</script>

<style scoped>
header {
  background-color: var(--background-color);

  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  height: 35px;
  padding: 0 5px;
}

.header-title img {
  height: 25px;
}

.header-buttons {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
