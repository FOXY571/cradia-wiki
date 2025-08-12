const autoTitleLink = (md) => {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefAttr = token.attrGet('href')

    if (hrefAttr && hrefAttr.startsWith('/')) {
      const href = hrefAttr.replace(/^\/+/, '')
      // Set the new title of the entry link here:
      const title = formatHref(href)

      token.attrSet('title', title)
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

// This is taken from formatEntryName in ../../utils/entryHandler
// Importing entryHandler causes an error (still looking into it)

// I believe it has something to do with how the entryHandler is importing all the entries before vite is done setting up

// Yeah, you're probably right
// One solution is to externalize the format function and move it to its own util
// It would also make it more universal across the application as some things that are formatted with the function aren't even entry names 💀

// Yeah, let's go with that solution
// I don't really like having duplicate code, so let's go with that
// Also, how did you put an emoji in your comment?

// I just copied it from an emoji website and pasted it here
// Also, I'll externalize the function later
// I'm too lazy right now

// Why would you copy and paste an emoji from a website?

// I thought it was funny

// So you're too lazy to externalize the function, but not lazy enough to copy and paste an emoji?

// Yes

// We're done here

// 😞

const formatHref = (href) => {
  let formattedHref = href
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => {
      let punctuationBefore = word.match(/^[^\w\u00C0-\u017F]+/)
      let punctuationAfter = word.match(/[^\w\u00C0-\u017F]+$/)

      let cleanWord = word.replace(/^[^\w\u00C0-\u017F]+|[^\w\u00C0-\u017F]+$/g, '')
      let formattedWord = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1)

      return (
        (punctuationBefore ? punctuationBefore[0] : '') +
        formattedWord +
        (punctuationAfter ? punctuationAfter[0] : '')
      )
    })
    .join(' ')
  return formattedHref
}

export default autoTitleLink
