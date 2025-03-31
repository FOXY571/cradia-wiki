const entryConverter = new showdown.Converter({
  extensions: [noteExtensions, hatnoteExtension],
  tables: true
});

function noteExtensions() {
  const warning = {
    type: 'output',
    filter: function(text) {
      const regex = /:::(warning):::(.*?):::/gs;
      return text.replace(regex, (match, p1, p2) => {
        return `<div class=warning><div>${p2}</div></div>`.replace(/::/, '<br>');
      });
    }
  }

  return [warning];
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