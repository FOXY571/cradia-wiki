const hatnote = () => {
  const hatnote = {
    type: 'lang',
    filter: function (text, converter) {
      const regex = /^(-#)[ \t]*(.*?)[ \t]*#*\n+/gm
      return text.replace(regex, (_match, _p1, p2) => {
        return `<div class="hatnote">${converter.makeHtml(p2)}</div>`
      })
    },
  }

  return [hatnote]
}

export default hatnote
