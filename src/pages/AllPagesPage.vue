<template>
  <h1>All Pages</h1>

  <p>Want to find something specific? This list contains every page in the wiki.</p>

  <ul>
    <li v-for="entryName in entryNames" :key="entryName">
      <a :title="formatEntryName(entryName)" :href="`/wiki/${entryName}`">
        {{ formatEntryName(entryName) }}
      </a>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import config from '../config'
import { getAllEntryNames } from '../utils/entryHandler'
import { formatEntryName } from '../utils/formatting'
import { setTitle } from '../utils/titleHandler'

const entryNames = ref([])

setTitle('All Pages')

onMounted(async () => {
  const names = await getAllEntryNames()
  entryNames.value = names.filter((name) => name !== config.mainPage)
})
</script>
