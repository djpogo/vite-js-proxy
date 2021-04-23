/**
 * viteProxy function
 *
 * on development this functions proxies the markup of the `target`
 * page into your browser on production an empty function is returned
 * @see `proxy.config.json`
 */

const mode = import.meta.env.MODE;

import {
	proxyPath,
 	addBaseTag,
 	proxyIgnoreTags,
	proxyRewriteSelector,
	proxyRoutes
} from '../proxy.config.json';

const pRoutes = proxyRoutes ? Array.isArray(proxyRoutes) ? proxyRoutes : [proxyRoutes] : [];

const loadPage =
	mode === 'production'
	? function() {}
	: function loadPage() {
		const { pathname } = document.location;
		// check that user custom proxy routes not tunneld through markup proxy
		if (pRoutes.find(route => route?.path.indexOf(pathname) === 0)) {
			console.info(`${pathname} looks like a user custom proxy route and is not markup tunneled`);
			return;
		}
		fetch(`${proxyPath}${pathname}`)
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
