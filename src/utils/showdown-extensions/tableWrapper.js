const tableWrapper = () => {
  const tableWrapper = {
    type: 'output',
    filter: function (text) {
      const regex =
        /<table[^>]*class=["'][^"'>]*\bcontent-table\b[^"'>]*["'][^>]*>[\s\S]*?<\/table>/g
      return text.replace(regex, (match) => {
        return `<div class="content-table-wrapper">${match}</div>`
      })
    },
  }

  return [tableWrapper]
}

export default tableWrapper
