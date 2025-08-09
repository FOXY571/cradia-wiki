export default function linkboxPlugin(md) {
  function parseLinkbox(content) {
    // Split lines by | and trim
    const lines = content
      .trim()
      .split('\n')
      .map((line) => line.trim())
    const label = lines[0] || ''
    const links = lines.slice(1)
    return { label, links }
  }

  md.block.ruler.before('fence', 'linkbox', (state, startLine, endLine, silent) => {
    const startPos = state.bMarks[startLine] + state.tShift[startLine]
    const maxPos = state.eMarks[startLine]

    if (state.src.slice(startPos, maxPos).startsWith('({linkbox')) {
      // Find the end of the block marked by "})"
      let nextLine = startLine + 1
      let found = false
      while (nextLine < endLine) {
        const lineText = state.getLines(nextLine, nextLine + 1, state.blkIndent, false).trim()
        if (lineText === '})') {
          found = true
          break
        }
        nextLine++
      }
      if (!found) return false // no closing tag

      if (silent) return true

      // Extract content lines between ({linkbox and })
      const content = state.getLines(startLine + 1, nextLine, state.blkIndent, false)

      const { label, links } = parseLinkbox(content)

      const token = state.push('html_block', '', 0)
      const linksJson = JSON.stringify(links)

      token.content = `<LinkBox label="${label}" :links='${linksJson}' />\n`

      state.line = nextLine + 1
      return true
    }
    return false
  })
}
