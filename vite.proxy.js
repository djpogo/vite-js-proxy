/**
 * viteProxy function
 * 
 * on development this functions proxies the markup of the `PROXY_HOST` page into your browser
 * on production an empty function is returned
 */

const mode = import.meta.env.MODE;
const loadPage = 
  mode === 'production' 
  ? function() {}
  : function loadPage() {
  fetch(`/proxy${document.location.pathname}`)
  .then((res) => res.text())
  .then((bodyText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyText, 'text/html');
    document.title = `/vit/ - ${doc.querySelector('head title').textContent}`;
    document.querySelector('#app').innerHTML = doc.querySelector('body').innerHTML;
  });
}

export default loadPage;