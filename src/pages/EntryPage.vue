<template>
  <component :is="entryComponent" v-if="entryComponent" />
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const entryComponent = shallowRef(null)
const entryName = ref(decodeURIComponent(route.path.split('/').pop() || 'home'))

const loadEntry = async () => {
  try {
    // Dynamic import based on entry name
    const module = await import(`../entries/${entryName.value}.md`)
    entryComponent.value = module.default

    // Handle hash navigation after component is loaded
    if (route.hash) {
      // Use nextTick or setTimeout to ensure DOM is updated
      setTimeout(() => {
        const id = decodeURIComponent(route.hash.slice(1))
        const element = document.getElementById(id)
        if (element) element.scrollIntoView()
      }, 100)
    }
  } catch (error) {
    console.error(`Failed to load entry: ${entryName.value}`, error)
    // You could load a fallback/error component here
  }
}

// Watch for route changes to load different entries
watch(
  () => route.path,
  () => {
    entryName.value = decodeURIComponent(route.path.split('/').pop() || 'home')
    loadEntry()
  },
)

onMounted(loadEntry)
</script>

<style scoped></style>
