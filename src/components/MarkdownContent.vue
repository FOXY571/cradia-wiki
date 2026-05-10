<template>
  <RenderedContent />
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'
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

const router = useRouter()

function handleClick(event) {
  const anchor = event.target.closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href')
  if (href && href.startsWith('/')) {
    event.preventDefault()
    router.push(href)
  }
}

const html = md.render(preprocessMarkdown(content))

const RenderedContent = defineComponent({
  render: () =>
    h(
      'div',
      { class: 'markdown-body', onClick: handleClick },
      htmlToVNodes(html, customComponents),
    ),
})
</script>
