const hatnote = (md) => {
  md.block.ruler.before('paragraph', 'hatnote', (tokens, idx) => {
    let pos = tokens.bMarks[idx] + tokens.tShift[idx]
    let max = tokens.eMarks[idx]
    let line = tokens.src.slice(pos, max)

    // Only trigger if it starts with "-# "
    if (!line.startsWith('-# ')) return false

    const content = line.slice(3) // text after "-# "

    // Opening <div>
    tokens.push('hatnote_open', 1)

    // Create inline token for content
    const tokenInline = tokens.push('inline', 0)
    tokenInline.children = []
    tokenInline.map = [idx, idx + 1]

    // Parse the inline markdown
    tokens.md.inline.parse(content, tokens.md, tokens.env, tokenInline.children)

    // Closing </div>
    tokens.push('hatnote_close', -1)

    tokens.line = idx + 1
    return true
  })

  // Define custom renderer rules for the tokens
  md.renderer.rules.hatnote_open = () => '<div class="hatnote"><p>'
  md.renderer.rules.hatnote_close = () => '</p></div>'
}

export default hatnote
