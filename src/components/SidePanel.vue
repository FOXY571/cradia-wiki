<template>
  <nav class="side-panel primary-border">
    <div class="panel-header" @click="toggle">
      <span class="label">{{ label }}</span>
      <span class="arrow-icon" :class="{ open: isOpen }"><ArrowDownIcon /></span>
    </div>
    <Transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div class="content" v-if="isOpen">
        <ul class="panel-list">
          <li v-for="(item, index) in items" :key="index">
            <component
              :is="item.newTab ? 'a' : RouterLink"
              class="panel-link"
              :title="item.toolTip"
              v-bind="item.newTab ? { href: item.href, target: '_blank' } : { to: item.href }"
            >
              <span>{{ item.label }}</span>
            </component>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import cookies from 'vue-cookies'

import ArrowDownIcon from './icons/ArrowDownIcon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const panelName = props.label.toLowerCase().replace(/\s+/g, '-')

const isOpen = ref(cookies.get(`${panelName}-panel-state`) !== 'false')

const showHeaderBorder = ref(isOpen.value)
const headerBorderWidth = computed(() => (showHeaderBorder.value ? '1px' : '0'))

function toggle() {
  isOpen.value = !isOpen.value
  cookies.set(`${panelName}-panel-state`, isOpen.value, '7d')
}

function beforeEnter(el) {
  el.style.maxHeight = '0'
  showHeaderBorder.value = true
}

function enter(el, done) {
  requestAnimationFrame(() => {
    el.style.transition = 'max-height 0.25s ease'
    el.style.maxHeight = el.scrollHeight + 'px'
    el.addEventListener('transitionend', done, { once: true })
  })
}

function leave(el, done) {
  el.style.overflow = 'hidden'
  el.style.maxHeight = el.scrollHeight + 'px'
  requestAnimationFrame(() => {
    el.style.transition = 'max-height 0.25s ease'
    el.style.maxHeight = '0'
    el.addEventListener(
      'transitionend',
      () => {
        showHeaderBorder.value = false
        done()
      },
      { once: true },
    )
  })
}
</script>

<style scoped>
.side-panel {
  background: var(--theme-panel-background);
  background-repeat: repeat-y;
  background-size: unset;

  box-shadow: 2.5px 2.5px 10px 0 rgba(10, 10, 10, 0.7);

  width: 200px;
  height: min-content;
}

.panel-header {
  background-color: rgba(0, 0, 0, 0.15);

  border-bottom: v-bind(headerBorderWidth) solid rgb(20, 20, 20);
  border-radius: 5px 5px 0 0;

  font-size: 17px;
  line-height: 10px;

  display: flex;
  cursor: pointer;

  height: 10px;
  padding: 10px;
}

.label {
  flex: 1;
}

.arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon.open {
  transform: rotate(180deg);
}

.content {
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  overflow: hidden;
}

.panel-list {
  list-style-type: none;

  margin: 0;
  padding: 0;
}

.panel-link {
  color: var(--link-color);
  font-size: 14px;
  text-decoration: none;

  display: block;

  margin: 7px;
  padding: 7px;

  transition: background 0.3s;
  cursor: pointer;
}

.panel-link:hover {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.panel-link:active {
  text-decoration: underline;
}

@media screen and (max-width: 576px) {
  .side-panel {
    width: auto;
  }
}
</style>
