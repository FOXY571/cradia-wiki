<template>
  <h1 v-if="getEntryProp(entryName, 'automaticHeader')">
    {{ formatEntryName(entryName) }}
  </h1>

  <div v-if="!entryExists">
    This page does not currently exist. You can view all existing pages
    <a title="All Pages" href="/wiki/All_Pages">here</a>.
  </div>
  <component :is="entryContent" v-else-if="entryContent" />
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, nextTick, shallowRef, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getEntry, getEntryProp } from '../utils/entryHandler'
import { formatEntryName } from '../utils/formatting'
import { setTitle } from '../utils/titleHandler'

const route = useRoute()

const entryContent = shallowRef(null)
const entryExists = ref(true)

const loadEntry = (entryName) => {
  const entry = getEntry(entryName)
  if (!entry) {
    entryExists.value = false
    return
  }

  entryContent.value = entry
}

const { entryName } = defineProps({
  entryName: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  loadEntry(entryName)

  if (entryName !== 'home') {
    setTitle(formatEntryName(entryName))
  }

  await nextTick()

  if (route.hash) {
    const id = decodeURIComponent(route.hash.slice(1))
    const element = document.getElementById(id)
    if (element) element.scrollIntoView()
  }
})
</script>

<style scoped></style>
