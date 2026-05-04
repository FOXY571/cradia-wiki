<template>
  <h1 v-if="entryContent !== undefined && entryProps.automaticHeader !== false">
    {{ formatEntryName(entryName) }}
  </h1>

  <p v-if="entryContent === undefined">Loading...</p>
  <p v-else-if="entryContent === null">
    This page does not currently exist. You can view all existing pages
    <RouterLink title="All Pages" :to="`/wiki/All_Pages`">here</RouterLink>.
  </p>
  <MarkdownContent v-else :content="entryContent" :customComponents="entryComponents" />
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import config from '../config'
import { getEntry } from '../utils/entryHandler'
import { formatEntryName } from '../utils/formatting'
import { setTitle, resetTitle } from '../utils/titleHandler'

import entryComponents from '../components/entry-components'
import MarkdownContent from '../components/MarkdownContent.vue'

const route = useRoute()

// The content of the entry. `undefined` while loading, `null` if the entry doesn't exist, and a string if it does.
const entryContent = ref(undefined)
const entryProps = ref({})

const props = defineProps({
  entryName: {
    type: String,
    required: true,
  },
})

watch(
  () => props.entryName,
  async (entryName) => {
    entryContent.value = undefined
    entryProps.value = {}

    await loadEntry(entryName)

    changeTitle(entryName !== config.mainPage ? formatEntryName(entryName) : null)

    await nextTick()

    scrollToHash()
  },
  { immediate: true },
)

async function loadEntry(entryName) {
  const entry = await getEntry(entryName)

  if (!entry) {
    entryContent.value = null
  } else {
    entryContent.value = entry.content
    entryProps.value = entry.properties || {}
  }
}

function changeTitle(newTitle) {
  if (newTitle) {
    setTitle(newTitle)
  } else {
    resetTitle()
  }
}

function scrollToHash() {
  if (route.hash) {
    const id = decodeURIComponent(route.hash.slice(1))
    const element = document.getElementById(id)
    if (element) element.scrollIntoView()
  } else {
    window.scrollTo(0, 0)
  }
}
</script>
