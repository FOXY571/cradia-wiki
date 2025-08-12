const entryPaths = import.meta.glob('./entries/*.md', { query: '?raw', import: 'default' })

const entries = {}

const extractNameFromPath = (path) => {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : null
}

for (const path in entryPaths) {
  const name = extractNameFromPath(path)
  const module = await import(path)

  const realName = module.name || name

  entries[realName] = module.default
}

export default entries
