const entryPaths = import.meta.glob('./entries/*.md', { query: '?raw', import: 'default' })

const entries = {}

function extractNameFromPath(path) {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : null
}

for (const path in entryPaths) {
  const name = extractNameFromPath(path)
  // Don't use path for a dynamic import to avoid problems with static analysis:
  // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
  const module = await import(`./entries/${name}.md`)

  const realName = module.name || name

  entries[realName] = module
}

export default entries
