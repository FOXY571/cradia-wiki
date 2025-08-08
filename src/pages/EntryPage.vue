<template>
  <VueShowdown
    :markdown="entryContent"
    :extensions="showdownExtensions"
    vue-template
    :vue-template-components="entryComponents"
  />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import contentLoader from '../util/contentLoader'
import showdownExtensions from '../util/showdown-extensions'

import { VueShowdown } from 'vue-showdown'
import entryComponents from '../components/entry-components'

const { loadContentFromRoute } = contentLoader()

const route = useRoute()
const entryContent = ref('')

const loadEntry = async () => {
  entryContent.value = await loadContentFromRoute(route)

  await nextTick()

  if (route.hash) {
    const id = decodeURIComponent(route.hash.slice(1))
    const element = document.getElementById(id)
    if (element) element.scrollIntoView()
  }
}

onMounted(loadEntry)
</script>

<style scoped></style>
