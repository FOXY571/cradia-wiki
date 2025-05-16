import * as entries from '../data/entries.js';
import entryConverter from './formatting/showdownConfiguration.js';

async function loadContentFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const entryName = urlParams.get('entry');

  const contentBody = document.querySelector('.js-content-body');
  if (entryName && entries.contains(entryName)) {
    const text = await entries.getEntry(entryName);
    contentBody.innerHTML = entryConverter.makeHtml(text);
  } else if (entryName.endsWith('-source')) {
    const text = await entries.getEntry(entryName.replace('-source', ''));
    const escapedText = text.replace(/[&<>"']/g, match => {
      switch(match) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&apos;';
      }
    });
    contentBody.innerHTML = `
      <h1>${entries.formatEntryName(entryName)}</h1>
      <pre>${escapedText}</pre>
    `;
  } else {
    contentBody.innerHTML = `
      <h1>404</h1>
      <p>
        It looks like you steered off course! Unfortunately, There is no entry for <i>${entries.formatEntryName(entryName)}.</i> :(
      </p>
      <p>
        Please click <b><a href="?entry=home" title="Home">here</a></b> to go back to safety.
      </p>
    `;
  }
}

loadContentFromUrl();

// Re-render when links are clicked (if using client-side routing)
document.body.addEventListener('click', e => {
  if (e.target.tagName == 'A' && e.target.href.includes('?entry=')) {
    e.preventDefault();
    const href = new URL(e.target.href);
    history.pushState({}, '', href.search);
    loadContentFromUrl();
  }
});

// Handle back/forward navigation
window.addEventListener('popstate', () => {
  loadContentFromUrl();
});