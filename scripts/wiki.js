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