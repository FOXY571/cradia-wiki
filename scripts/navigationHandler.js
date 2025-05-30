export function getEntryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const entryName = urlParams.get('entry');

  return entryName;
}

// This forces a route change and calls event to update everything
export function changeRoute(href) {
  history.pushState({}, '', href);
  document.dispatchEvent(onRouteChanged);
  console.log('Changed route to ' + href);
}

const onRouteChanged = new CustomEvent("onRouteChanged");

// Re-render when links are clicked (if using client-side routing)
document.body.addEventListener('click', e => {
  if (e.target.tagName == 'A' && e.target.href.includes('?entry=')) {
    e.preventDefault();
    const href = new URL(e.target.href);
    changeRoute(href);
  }
});

// Handle back/forward navigation
window.addEventListener('popstate', () => {
  document.dispatchEvent(onRouteChanged);
});