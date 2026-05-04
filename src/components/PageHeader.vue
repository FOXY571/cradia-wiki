<template>
  <header>
    <div class="header-title">
      <a title="Visit the main page" href="/">
        <img src="../assets/images/logo.png" :alt="`${config.wikiName} Wiki`" />
      </a>
    </div>
    <div class="header-buttons">
      <ThemeChanger />
      <div v-if="currentUser">
        <a href="#" title="Log out" @click="handleLogOut">Log out</a>
      </div>
      <div v-else-if="currentUser === null">
        <a
          :href="createAccountUrl"
          title="You are encouraged to create an account and log in; however, it is not mandatory"
        >
          Create account
        </a>
        <a :href="loginUrl" title="You are encouraged to log in; however, it is not mandatory">
          Log in
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import config from '../config'
import { currentUser, logOut } from '../firebase/authHandler'
import { useAuthUrls } from '../utils/authUrls'

import ThemeChanger from './ThemeChanger.vue'

async function handleLogOut() {
  await logOut()
  window.location.reload()
}

const { createAccountUrl, loginUrl } = useAuthUrls()
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
  padding: 0 10px;
}

.header-title img {
  height: 25px;
}

.header-buttons {
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 0.75rem;
}

.header-buttons a {
  color: var(--primary-color);
  font-size: 0.9rem;
  text-decoration: none;
}

.header-buttons a:hover {
  text-decoration: underline;
}
</style>
