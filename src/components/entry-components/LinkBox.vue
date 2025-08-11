<template>
  <div class="link-box">
    <div class="label">{{ label }}</div>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <a :title="formatEntryName(link)" :href="`/${link}`">{{ formatEntryName(link) }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import entryHandler from '../../utils/entryHandler'

const { formatEntryName } = entryHandler()

defineProps({
  label: {
    type: String,
    default: 'Links',
  },
  links: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.link-box {
  background-color: rgba(0, 0, 0, 0.1);

  margin-bottom: 25px;
  padding: 3px;
}

.label {
  color: var(--secondary-color);
  background-color: rgba(0, 0, 0, 0.1);

  font-size: 20px;
  text-align: center;
  line-height: 24px;
  white-space: nowrap;

  padding: 5px;
  margin-bottom: 2.5px;
}

ul {
  list-style-type: none;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-left: 25px;
  margin-right: 25px;
  padding: 0;
}

li {
  white-space: nowrap;

  display: inline;

  margin: 10px;
}
</style>
