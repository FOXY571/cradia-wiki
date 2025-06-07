import { getEntryFromUrl } from './navigationHandler.js';
import * as entries from '../data/entries.js';
import entryConverter from './formatting/showdownConfiguration.js';

const onContentLoaded = new CustomEvent("onContentLoaded");

async function loadContentFromUrl() {
  const entryName = getEntryFromUrl();
  const contentBody = document.getElementById('contentBody');

  if (entryName && await entries.contains(entryName)) {
    const text = await entries.getEntry(entryName);
    contentBody.innerHTML = entryConverter.makeHtml(text);
  } else if (entryName && entryName.endsWith('-source')) {
    const baseEntry = entryName.replace('-source', '');
    const text = await entries.getEntry(baseEntry);
    const escapedText = text.replace(/[&<>"']/g, match => {
      switch (match) {
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
        It looks like you steered off course! Unfortunately, there is no entry for <i>${entries.formatEntryName(entryName)}</i> :(
      </p>
      <p>
        Please click <b><a href="?entry=home" title="Home">here</a></b> to go back to safety.
      </p>
    `;
  }

  document.dispatchEvent(onContentLoaded);
  scrollToHash(); // Scroll to hashed element when the content is done loading if it exists
}

loadContentFromUrl();

document.addEventListener('onRouteChanged', () => {
  loadContentFromUrl();
});

function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const hashElement = document.querySelector(hash);
    if (hashElement) {
      hashElement.scrollIntoView();
    }
  }
}