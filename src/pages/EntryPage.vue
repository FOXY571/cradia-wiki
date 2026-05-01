<template>
  <h1 v-if="automaticHeader">
    {{ formatEntryName(entryName) }}
  </h1>

  <div v-if="!entryExists">
    This page does not currently exist. You can view all existing pages
    <a title="All Pages" href="/wiki/All_Pages">here</a>.
  </div>
  <MarkdownContent
    v-else-if="entryContent"
    :content="entryContent"
    :customComponents="entryComponents"
  />
  <div v-else>Loading...</div>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import config from '../config'
import { getEntry } from '../utils/entryHandler'
import { formatEntryName } from '../utils/formatting'
import { setTitle } from '../utils/titleHandler'

import entryComponents from '../components/entry-components'
import MarkdownContent from '../components/MarkdownContent.vue'

const route = useRoute()

const entryContent = ref(null)
const entryExists = ref(true)
const automaticHeader = ref(true)

const { entryName } = defineProps({
  entryName: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  const entry = await getEntry(entryName)

  if (!entry) {
    entryExists.value = false
  } else {
    automaticHeader.value = entry.automaticHeader !== false
    entryContent.value = entry.content
  }

  if (entryName !== config.mainPage) {
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
