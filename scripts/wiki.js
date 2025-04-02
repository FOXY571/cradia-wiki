import {getRandomEntryName} from '../data/entries.js';

const urlParams = new URLSearchParams(window.location.search);
const entryName = urlParams.get('entry');

if (!entryName) {
  window.location.href = '?entry=home';
}

document.querySelector('.js-random-page-link')
  .addEventListener('click', () => {
    window.location.href = `?entry=${getRandomEntryName()}`;
  });

const sourceButton = document.querySelector('.js-source-button');
if (entryName.endsWith('-source')) {
  sourceButton.innerHTML = `<a class="header-link" title="View the page">View page</a>`;
  sourceButton.addEventListener('click', () => {
    window.location.href = `?entry=${entryName.replace('-source', '')}`;
  });
} else {
  sourceButton.innerHTML = `<a class="header-link" title="View the page's source">View source</a>`;
  sourceButton.addEventListener('click', () => {
    window.location.href = `?entry=${entryName}-source`;
  });
}