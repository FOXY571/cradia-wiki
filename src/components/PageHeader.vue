<template>
  <header>
    <div class="header-title">
      <a title="Visit the main page" href="/">
        <img src="../assets/images/logo.png" alt="Cradia Wiki logo" />
      </a>
    </div>
    <div class="header-buttons"></div>
  </header>
</template>

<script setup></script>

<style scoped>
header {
  background-color: var(--background-color);

  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 35px;
  padding: 0 5px;
}

.header-title img {
  height: 25px;
}

.header-buttons {
  flex: 1;
}
</style>
