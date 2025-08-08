<template>
  <h1 id="all-pages">All Pages</h1>

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
import entryHandler from '../util/entryHandler'

const { getAllEntryNames, formatEntryName } = entryHandler()
</script>

<style scoped></style>
