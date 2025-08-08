const showdownHelper = () => {
  const convertSingleLine = (text, converter) => {
    return converter.makeHtml(text).replace(/^<p>|<\/p>$/g, '')
  }

  const escapeQuotes = (text) => {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;')
  }

  return {
    convertSingleLine,
    escapeQuotes,
  }
}

export default showdownHelper
