<template>
  <component :is="entryContent" v-if="entryContent" />
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, nextTick, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import entriesHandler from '../utils/entryHandler'
import titleHandler from '../utils/titleHandler'

const { getEntry, formatEntryName } = entriesHandler()
const { setTitle } = titleHandler()

const route = useRoute()
const entryContent = shallowRef('')

const loadEntry = async (entryName) => {
  entryContent.value = await getEntry(entryName)
}

const props = defineProps({
  entryName: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await loadEntry(props.entryName)

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
