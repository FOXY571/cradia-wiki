<template>
  <h1>404</h1>

  <p>
    It looks like you steered off course! Unfortunately, there is no entry for
    <i>{{ formatEntryName(entryName) }}</i> :(
  </p>

  <p>Please click <a title="Home" href="/">here</a> to go back to safety.</p>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { formatEntryName } from '../utils/formatting'
import { setTitle } from '../utils/titleHandler'

const route = useRoute()

const entryName = decodeURIComponent(route.path.split('/').pop() || 'home')

setTitle(formatEntryName(entryName))
</script>

<style scoped></style>
