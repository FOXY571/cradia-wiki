<template>
  <RenderedContent />
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { md } from '../markdown-it'
import { htmlToVNodes, preprocessMarkdown } from '../utils/htmlToVNodes'

const { content, customComponents } = defineProps({
  content: {
    type: String,
    required: true,
  },
  customComponents: {
    type: Object,
    default: () => ({}),
  },
})

const html = md.render(preprocessMarkdown(content))
console.log(preprocessMarkdown(content))

const RenderedContent = defineComponent({
  render: () => h('div', { class: 'markdown-body' }, htmlToVNodes(html, customComponents)),
})
</script>
