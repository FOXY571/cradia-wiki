const note = () => {
  const note = {
    type: 'lang',
    filter: function (text, converter) {
      const regex = /:::(note):::(.*?):::/gs
      return text.replace(regex, (_match, _p1, p2) => {
        return makeNote('note', p2, converter)
      })
    },
  }

  const warning = {
    type: 'lang',
    filter: function (text, converter) {
      const regex = /:::(warning):::(.*?):::/gs
      return text.replace(regex, (_match, _p1, p2) => {
        return makeNote('warning', p2, converter)
      })
    },
  }

  const makeNote = (type, text, converter) => {
    let output = `<div class="${type}"><div>${converter.makeHtml(text)}</div></div>`
    output = output.replace(/<p>/g, '<span>')
    output = output.replace(/<\/p>/g, '</span>')
    return output
  }

  return [note, warning]
}

export default note
