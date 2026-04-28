<template>
  <div></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import config from '../config'
import { getAllEntryNames } from '../utils/entryHandler'

const router = useRouter()

const entryNames = getAllEntryNames().filter((name) => name !== config.mainPage)
const randomEntry = entryNames[Math.floor(Math.random() * entryNames.length)]

router.replace(`/wiki/${randomEntry}`)
</script>
