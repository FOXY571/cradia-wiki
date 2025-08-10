<template>
  <h1 id="404">404</h1>

  <p>
    It looks like you steered off course! Unfortunately, there is no entry for
    <i>{{ formatEntryName(entryName) }}</i> :(
  </p>

  <p>Please click <a title="Home" href="/">here</a> to go back to safety.</p>
</template>

<script setup>
import { useRoute } from 'vue-router'
import entryHandler from '../utils/entryHandler'

const route = useRoute()
const { formatEntryName } = entryHandler()

const entryName = decodeURIComponent(route.path.split('/').pop() || 'home')
</script>

<style scoped></style>
