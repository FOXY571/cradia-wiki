<template>
  <h1>All Pages</h1>

  <p>Want to find something specific? This list contains every page in the wiki.</p>

  <ul>
    <li v-for="entryName in entryNames" :key="entryName">
      <a :title="formatEntryName(entryName)" :href="entryName">
        {{ formatEntryName(entryName) }}
      </a>
    </li>
  </ul>
</template>

<script setup>
import { getAllEntryNames } from '../utils/entryHandler'
import { formatEntryName } from '../utils/formatting'
import { setTitle } from '../utils/titleHandler'

const entryNames = getAllEntryNames().filter((name) => name !== 'Cradia_Wiki')

setTitle('All Pages')
</script>

<style scoped></style>
