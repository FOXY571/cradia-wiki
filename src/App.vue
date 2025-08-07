<template>
  <div class="background"></div>

  <div class="app-container">
    <div class="logo">
      <a title="Visit the main page" href="/"></a>
    </div>

    <div class="content-wrapper">
      <div class="panels">
        <SidePanel
          label="Navigation"
          :items="[
            { label: 'Main page', toolTip: 'Visit the main page', href: '/' },
            { label: 'All pages', toolTip: 'Look at all pages', href: '/all-pages' },
            {
              label: 'Random page',
              toolTip: 'Load a random page',
              href: `/${getRandomEntryName()}`,
            },
            { label: 'Help', toolTip: 'Get some help', href: '/help' },
          ]"
        />
        <SidePanel
          label="Books"
          :items="[
            {
              label: 'The Prince\'s truth',
              toolTip: 'Read The Prince\'s Truth',
              href: 'https://docs.google.com/document/d/1SCAqx2TM08QJp9W8waC3sXVsQbn6opX7FLpoLhBMtJM/edit?usp=sharing',
              newTab: true,
            },
            {
              label: 'Heyvan',
              toolTip: 'Read Heyvan',
              href: 'https://docs.google.com/document/d/1znis8jsUf_rI-8urWsdnmdusVwqlymZG8xuqvJfN74Y/edit?usp=sharing',
              newTab: true,
            },
          ]"
        />
      </div>

      <div class="main-panel panel primary-border">
        <div class="panel-header"></div>

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
import { watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import entryHandler from './util/entryHandler.js'

import SidePanel from './components/SidePanel.vue'
import PageFooter from './components/PageFooter.vue'

const { getRandomEntryName } = entryHandler()

const route = useRoute()
const router = useRouter()

// Redirect /home to /
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/home') router.replace('/')
  },
  { immediate: true }
)
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
