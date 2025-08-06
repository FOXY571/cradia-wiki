<template>
  <div class="background"></div>

  <div class="app-container">
    <div class="logo">
      <a title="Visit the main page"></a>
    </div>

    <div class="content-wrapper">
      <div class="panels">
        <SidePanel
          label="Navigation"
          :items="[
            { label: 'Main page', toolTip: 'Visit the main page' },
            { label: 'All pages', toolTip: 'Look at all pages' },
            { label: 'Random page', toolTip: 'Load a random page' },
            { label: 'Help', toolTip: 'Get some help' },
          ]"
        />
        <SidePanel
          label="Books"
          :items="[
            { label: 'The Prince\'s truth', toolTip: 'Read The Prince\'s Truth' },
            { label: 'Heyvan', toolTip: 'Read Heyvan' },
          ]"
        />
      </div>

      <div class="main-panel panel primary-border">
        <div class="main-content">
          <div class="content-body">
            <RouterView />
          </div>
          <div class="side-spacer"></div>
        </div>
      </div>
    </div>

    <PageFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

import SidePanel from './components/SidePanel.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<style scoped>
.background {
  position: fixed;

  background-image: url('./assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(3px);

  transform: scale(1.1);
  height: 100%;
  width: 100%;
  z-index: -1;
}

.app-container {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
}

.logo {
  background-image: url('./assets/images/logo.png');
  background-repeat: no-repeat;
  background-position: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 175px;
}

.logo a {
  width: 325px;
  height: 50%;
}

.content-wrapper {
  flex: 1;

  display: flex;
  gap: 10px;

  margin: 25px;
  margin-top: 0;
}

.panels {
  background-size: unset;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-panel {
  flex: 1;
}

.main-content {
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  display: flex;
  overflow: hidden;
}

.content-body {
  flex: 1;
  overflow: auto;

  height: min-content;
  padding: 20px;
}

.side-spacer {
  width: 300px;
}

@media (max-width: 1250px) {
  .side-spacer {
    width: 0;
  }

  .header-buttons {
    margin-right: 0;
  }
}

@media (max-width: 900px) {
  .logo {
    background-size: auto 75%;

    height: 135px;
  }

  .content-wrapper {
    flex-direction: column-reverse;
    justify-content: start;
  }

  .panels {
    flex-direction: row;
  }

  .main-content {
    flex: 0;
  }
}

@media (max-width: 600px) {
  .logo {
    background-size: auto 65%;

    height: 100px;
  }
}

@media screen and (max-width: 450px) {
  .panels {
    flex-direction: column;
  }
}
</style>
