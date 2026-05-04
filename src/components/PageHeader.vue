<template>
  <header>
    <div class="header-title">
      <RouterLink title="Visit the main page" to="/">
        <img src="../assets/images/logo.png" :alt="`${config.wikiName} Wiki`" />
      </RouterLink>
    </div>
    <div class="header-buttons">
      <ThemeChanger />

      <div class="header-divider"></div>

      <UserMenu v-if="currentUser && userData" :userData="userData" />

      <RouterLink
        :to="createAccountUrl"
        title="You are encouraged to create an account and log in; however, it is not mandatory"
        v-if="currentUser === null"
      >
        Create account
      </RouterLink>
      <RouterLink
        :to="loginUrl"
        title="You are encouraged to log in; however, it is not mandatory"
        v-if="currentUser === null"
      >
        Log in
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import config from '../config'
import { currentUser, useUserData } from '../firebase/authHandler'

const userData = useUserData()
import { useAuthUrls } from '../utils/authUrls'

import ThemeChanger from './ThemeChanger.vue'
import UserMenu from './UserMenu.vue'

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

.header-divider {
  width: 1px;
  height: 18px;
  background-color: var(--primary-color);
  opacity: 0.4;
}
</style>
