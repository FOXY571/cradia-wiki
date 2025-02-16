async function getEntries() {
  try {
    const response = await fetch('../backend/entries.json');
    const fileContent = await response.json();
    return fileContent;
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
}

export let entries = await getEntries();

export async function getEntry(entryName) {
  try {
    const response = await fetch(`../backend/entries/${entryName}.html`);
    const fileContent = await response.text();
    return fileContent;
  } catch (error) {
    console.error('Error fetching entry:', error);
  }
}

export function getRandomEntryName() {
  return entries[Math.floor(Math.random() * entries.length)];
}

export function contains(entryName) {
  return entries.includes(entryName);
}

export function fomratEntryName(entryName) {
  let formattedName = entryName.replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return formattedName;
}