const contentTable = (md) => {
  // Core rule: run after parsing to mutate token stream
  md.core.ruler.push('content_table', (state) => {
    const Token = state.Token
    // iterate tokens and insert wrapper tokens around each table
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i]

      if (token.type === 'table_open') {
        // 1) ensure table has class 'content-table' (append if class exists)
        const classIndex = token.attrIndex && token.attrIndex('class')
        if (classIndex < 0) {
          token.attrPush(['class', 'content-table'])
        } else {
          // attrPush not needed — modify existing attr value
          token.attrs[classIndex][1] = token.attrs[classIndex][1] + ' content-table'
        }

        // 2) create wrapper open token and insert before the table_open
        const wrapperOpen = new Token('content_table_open', 'div', 1)
        wrapperOpen.attrs = [['class', 'content-table-wrapper']]

        state.tokens.splice(i, 0, wrapperOpen)
        i++ // advance past the inserted token so we don't re-process it

        // 3) find matching table_close for this table and insert wrapper close after it
        // The table structure is well-formed, so search forward for 'table_close'
        let j = i + 1
        let depth = 1
        while (j < state.tokens.length) {
          const t = state.tokens[j]
          if (t.type === 'table_open') depth++
          else if (t.type === 'table_close') {
            depth--
            if (depth === 0) {
              // insert closing wrapper after this token
              const wrapperClose = new Token('content_table_close', 'div', -1)
              state.tokens.splice(j + 1, 0, wrapperClose)
              // move i past the wrapper close so outer loop continues correctly
              i = j + 1
              break
            }
          }
          j++
        }
      }
    }
  })

  // Renderer rules for the synthetic wrapper tokens
  md.renderer.rules.content_table_open = () => '<div class="content-table-wrapper">'
  md.renderer.rules.content_table_close = () => '</div>'
}

export default contentTable
