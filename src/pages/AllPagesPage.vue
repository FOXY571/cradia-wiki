<template>
  <h1>All Pages</h1>

  <p>Want to find something specific? This list contains every page in the wiki.</p>

  <ul>
    <li v-for="entryName in getAllEntryNames()" :key="entryName">
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

setTitle('All Pages')
</script>

<style scoped></style>
