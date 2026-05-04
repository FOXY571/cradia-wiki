<template>
  <div class="user-menu">
    <input id="userMenuCheckbox" type="checkbox" role="button" @click="toggle" />
    <label for="userMenuCheckbox">
      <span>{{ userData.username || 'User' }}</span>
      <ArrowDownIcon class="arrow-icon" :class="{ open: isOpen }" />
    </label>
    <div v-if="isOpen" class="menu-popup">
      <div class="menu-popup-inner">
        <ul>
          <li>
            <button title="Your preferences" @click="visitPreferences">
              <GearIcon />
              <span>Preferences</span>
            </button>
          </li>
          <li>
            <button title="Log out" @click="handleLogout">
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logOut } from '../firebase/authHandler'

import ArrowDownIcon from './icons/ArrowDownIcon.vue'
import GearIcon from './icons/GearIcon.vue'
import LogoutIcon from './icons/LogoutIcon.vue'

const router = useRouter()

const isOpen = ref(false)

defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

function toggle() {
  isOpen.value = !isOpen.value
}

async function visitPreferences() {
  await router.push('/wiki/Preferences')
  isOpen.value = false
}

async function handleLogout() {
  await logOut()
  isOpen.value = false
}
</script>

<style scoped>
.user-menu {
  font-size: 0.9rem;

  position: relative;
  display: inline-block;
}

.user-menu input {
  display: none;
}

.user-menu label {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  padding: 3px 0.4em;
}

.user-menu label span {
  display: inline-flex;
  align-items: center;
}

.arrow-icon.open {
  transform: rotate(180deg);
}

.menu-popup {
  position: absolute;
  right: 0;
  left: auto;

  max-width: 300px;
  padding-top: 5px;
}

.menu-popup-inner {
  background: var(--background-color);
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  padding: 10px;
}

.menu-popup ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-popup li {
  margin: 5px 0;
}

.menu-popup button {
  background: none;
  color: var(--primary-color);

  border: none;
  border-radius: 5px;
  text-align: left;

  display: flex;
  align-items: center;
  gap: 0.5em;

  cursor: pointer;

  width: 100%;
  padding: 5px 10px;
}

.menu-popup button:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>
