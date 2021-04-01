import './style.css'

const host = import.meta.env.VITE_APP_HOST;

console.log(host);

document.addEventListener('click', (event) => {
  if (event.target.matches('a[href]:not([target="_blank"])')) {
    event.preventDefault();
    const url = new URL(event.target.href);
    window.history.pushState(null, '', `#${url.pathname}`);
  }
});

window.addEventListener('hashchange', (event) => {
  console.log(event);
});

function loadPage() {
  fetch(`${host}${document.location.hash.substr(1)}`)
  .then((res) => res.text())
  .then((bodyText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyText, 'text/html');
    document.querySelector('#app').innerHTML = doc.querySelector('body').innerHTML;
  });
}

loadPage();

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a> <a href="/hello-world">bämm</a>
`
