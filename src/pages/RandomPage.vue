<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import config from '../config'
import { getAllEntryNames } from '../utils/entryHandler'

const router = useRouter()

onMounted(async () => {
  const allNames = await getAllEntryNames()

  const entryNames = allNames.filter((name) => name !== config.mainPage)
  const randomEntry = entryNames[Math.floor(Math.random() * entryNames.length)]

  router.replace(`/wiki/${randomEntry}`)
})
</script>
