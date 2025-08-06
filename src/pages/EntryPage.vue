<template>
  <div class="entry-content" v-html="entryContent"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import contentLoader from '../util/contentLoader'

const { loadContentFromRoute } = contentLoader()

const route = useRoute()
const entryContent = ref('')

onMounted(async () => {
  entryContent.value = await loadContentFromRoute(route)
})
</script>

<style>
.entry-content h1 {
  color: var(--secondary-color);
  font-family: 'Times New Roman', Times, serif;
  font-weight: normal;

  margin-top: 0;
  margin-bottom: 22px;
}

.entry-content h2 {
  font-weight: normal;
  line-height: 32px;

  display: flow-root;

  margin-top: 18px;
  margin-bottom: 12px;
}

.entry-content h1::after,
.entry-content h2::after {
  content: '';
  pointer-events: none;

  border-top: 1px solid rgb(20, 20, 20);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  display: block;

  height: 0;
  margin-top: 3px;
}

.entry-content h3 {
  font-weight: normal;
  line-height: 28px;
}

.entry-content a {
  color: var(--link-color);
  text-decoration: none;
}

.entry-content a:hover {
  text-decoration: underline;
}
</style>
