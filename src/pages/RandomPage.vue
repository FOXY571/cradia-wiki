<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import config from '../config'
import { getAllEntryNames } from '../utils/entryHandler'

onMounted(async () => {
  const allNames = await getAllEntryNames()

  const entryNames = allNames.filter((name) => name !== config.mainPage)
  const randomEntry = entryNames[Math.floor(Math.random() * entryNames.length)]

  document.location.href = `/wiki/${randomEntry}`
})
</script>
