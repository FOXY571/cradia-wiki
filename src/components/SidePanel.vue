<template>
  <div class="side-panel panel primary-border">
    <p class="panel-label" v-if="label">{{ label }}</p>
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
  </div>
</template>

<script setup>
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

.panel-label {
  background-color: rgba(0, 0, 0, 0.15);

  border-color: rgb(20, 20, 20);
  border-style: solid;
  border-width: 0 0 1px 0;
  border-radius: 5px 5px 0 0;

  font-size: 17px;
  line-height: 10px;

  margin: 0;
  padding: 10px;
}

.panel-list {
  border-top: 1px solid rgba(255, 255, 255, 0.1);

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

@media screen and (max-width: 450px) {
  .side-panel {
    width: auto;
  }
}
</style>
