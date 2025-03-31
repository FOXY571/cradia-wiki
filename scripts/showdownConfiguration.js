const entryConverter = new showdown.Converter({
  extensions: [extensions],
  tables: true
});

function extensions() {
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