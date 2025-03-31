const entryConverter = new showdown.Converter({
  extensions: [noteExtension, hatnoteExtension],
  tables: true
});

function noteExtension() {
  const note = {
    type: 'output',
    filter: function(text) {
      const regex = /:::(note):::(.*?):::/gs;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class=note><div>${p2}</div></div>`;
      });
    }
  }
  const warning = {
    type: 'output',
    filter: function(text) {
      const regex = /:::(warning):::(.*?):::/gs;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class=warning><div>${p2}</div></div>`;
      });
    }
  }

  return [note, warning];
}

function hatnoteExtension() {
  const hatnote = {
    type: 'output',
    filter: function(text) {
      const regex = /::(.*?)::/g;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class=hatnote>${p1}</div>`;
      });
    }
  }

  return [hatnote];
}