<template>
  <Panel class="side-panel" background-size="unset">
    <template #header>{{ label }}</template>
    <ul class="panel-list">
      <li v-for="(item, index) in items" :key="index">
        <a
          class="panel-link"
          :title="item.toolTip"
          :href="item.href"
          :target="item.newTab ? '_blank' : '_self'"
        >
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </Panel>
</template>

<script setup>
import Panel from './PanelContainer.vue'

defineProps({
  label: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.side-panel {
  background-size: unset;

  width: 200px;
  height: min-content;
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
