/**
 * viteProxy function
 *
 * on development this functions proxies the markup of the `PROXY_HOST` page into your browser
 * on production an empty function is returned
 */

const mode = import.meta.env.MODE;

import {
	proxyPath,
	addBaseTag,
	proxyIgnoreTags,
	proxyRewriteSelector
} from './proxy.config.json';


const loadPage =
  mode === 'production'
  ? function() {}
  : function loadPage() {
    fetch(`${proxyPath}${document.location.pathname}`)
    .then((res) => res.text())
    .then((bodyText) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(bodyText, 'text/html');
      document.title = `:/vit/: ${doc.querySelector('head title').textContent}`;
      doc.querySelectorAll(proxyRewriteSelector).forEach((element) => {
				if (proxyIgnoreTags.some(ingoreTag => element.matches(ingoreTag))) {
					element.dataset.viteProxy = false;
				} else {
					const src = new URL(element.src);
					element.dataset.viteProxy = true;
					element.src = `${proxyPath}${src.pathname.replace(/^\//, '')}`;
				}
			});
			if (addBaseTag) {
				const base = document.createElement('base');
				base.href = proxyPath;
				base.dataset.viteProxy = true;
				document.head.appendChild(base);
			}
      document.querySelector('#app').innerHTML = doc.querySelector('body').innerHTML;
    });
}

export default loadPage;
