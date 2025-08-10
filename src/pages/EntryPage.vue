<template>
  <div v-if="entryContent" v-html="entryContent"></div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import entriesHandler from '../utils/entryHandler'
import entryConverter from '../utils/entryConverter'

const { getEntry, formatEntryName } = entriesHandler()

const route = useRoute()
const entryContent = ref('')

const loadEntry = async (entryName) => {
  const entry = await getEntry(entryName)
  entryContent.value = entryConverter.makeHtml(entry)
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
    document.title = `${formatEntryName(props.entryName)} - Cradia Wiki`
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
