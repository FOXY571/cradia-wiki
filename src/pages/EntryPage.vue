<template>
  <h1 v-if="getEntryProp(entryName, 'automaticHeader')">
    {{ formatEntryName(props.entryName) }}
  </h1>

  <component :is="entryContent" v-if="entryContent" />
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, nextTick, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { getEntry, getEntryProp } from '../utils/entryHandler'
import { formatEntryName } from '../utils/formatting'
import { setTitle } from '../utils/titleHandler'

const route = useRoute()
const entryContent = shallowRef('')

const loadEntry = (entryName) => {
  entryContent.value = getEntry(entryName)
}

const props = defineProps({
  entryName: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  loadEntry(props.entryName)

  if (props.entryName !== 'home') {
    setTitle(formatEntryName(props.entryName))
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
