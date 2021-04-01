import './style.css'

const host = import.meta.env.VITE_APP_HOST;

function loadPage() {
  fetch(`${host}${document.location.pathname}`)
  .then((res) => res.text())
  .then((bodyText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyText, 'text/html');
    document.title = `/vit/ - ${doc.querySelector('head title').textContent}`;
    document.querySelector('#app').innerHTML = doc.querySelector('body').innerHTML;
  });
}

loadPage();

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a> <a href="/hello-world">bämm</a>
`
