
export function loadPage() {
  fetch(`/proxy${document.location.pathname}`)
  .then((res) => res.text())
  .then((bodyText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyText, 'text/html');
    document.title = `/vit/ - ${doc.querySelector('head title').textContent}`;
    document.querySelector('#app').innerHTML = doc.querySelector('body').innerHTML;
  });
}