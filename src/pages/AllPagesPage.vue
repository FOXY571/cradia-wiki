<template>
  <h1>All Pages</h1>

  <p>Want to find something specific? This list contains every page in the wiki.</p>

  <p v-if="entryNames === null">Loading...</p>
  <p v-else-if="entryNames.length === 0">There are no pages available.</p>
  <ul v-else>
    <li v-for="entryName in entryNames" :key="entryName">
      <RouterLink :title="formatEntryName(entryName)" :to="`/wiki/${entryName}`">
        {{ formatEntryName(entryName) }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import config from '../config'
import { getAllEntryNames } from '../utils/entryHandler'
import { formatEntryName } from '../utils/formatting'

// The list of all entry names, excluding the main page. `null` while loading.
const entryNames = ref(null)

onMounted(async () => {
  const names = await getAllEntryNames()
  entryNames.value = names.filter((name) => name !== config.mainPage)
})
</script>
