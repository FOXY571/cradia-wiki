<template>
  <header>
    <div class="header-title">
      <a title="Visit the main page" href="/">
        <img src="../assets/images/logo.png" alt="Cradia Wiki logo" />
      </a>
    </div>
    <div class="header-buttons">
      <div class="theme-select">
        <input id="themesCheckbox" type="checkbox" role="button" @click="toggle" />
        <label for="themesCheckbox">
          <span>Appearance <ArrowDownIcon class="arrow-icon" :class="{ open: isOpen }" /></span>
        </label>
        <div v-if="isOpen" class="theme-popup">
          <div class="theme-popup-inner">
            <ul>
              <li v-for="(theme, name) in themes" :key="name">
                <button :class="{ selected: currentTheme === name }" @click="switchTheme(name)">
                  {{ theme.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { themes, currentTheme, switchTheme } from '../utils/themeSwitcher'

import ArrowDownIcon from './icons/ArrowDownIcon.vue'

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  switchTheme(currentTheme.value)
})
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

.theme-select {
  position: relative;
  display: inline-block;
}

.theme-select input {
  display: none;
}

.theme-select label {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  padding: 3px 0.4em;
}

.theme-select label span {
  display: inline-flex;
  align-items: center;
}

.arrow-icon.open {
  transform: rotate(180deg);
}

.theme-popup {
  position: absolute;
  right: 0;
  left: auto;

  max-width: 300px;
  padding-top: 5px;
}

.theme-popup-inner {
  background: var(--background-color);
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  padding: 10px;
}

.theme-popup ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.theme-popup li {
  margin: 5px 0;
}

.theme-popup button {
  color: var(--primary-color);
  text-align: left;

  width: 100%;
}

.theme-popup button:hover,
.theme-popup button.selected {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.theme-popup button {
  background: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.theme-popup button:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>
