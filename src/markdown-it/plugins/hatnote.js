function hatnote(md) {
  md.block.ruler.before('paragraph', 'hatnote', (state, startIndex) => {
    let pos = state.bMarks[startIndex] + state.tShift[startIndex]
    let max = state.eMarks[startIndex]
    let line = state.src.slice(pos, max)

    // Only trigger if it starts with "-# "
    if (!line.startsWith('-# ')) return false

    const content = line.slice(3) // text after "-# "

    // Opening <div>
    state.push('hatnote_open', 1)

    // Create inline token for content
    const tokenInline = state.push('inline', 0)
    tokenInline.children = []
    tokenInline.map = [startIndex, startIndex + 1]

    // Parse the inline markdown
    state.md.inline.parse(content, state.md, state.env, tokenInline.children)

    // Closing </div>
    state.push('hatnote_close', -1)

    state.line = startIndex + 1
    return true
  })

  // Define custom renderer rules for the state
  md.renderer.rules.hatnote_open = () => '<div class="hatnote"><p>'
  md.renderer.rules.hatnote_close = () => '</p></div>'
}

export default hatnote
