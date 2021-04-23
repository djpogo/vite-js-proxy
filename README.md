# vite-js-proxy

Use the superpowers of [vite.js](https://vitejs.dev)🚀 to frontend tool any running website.

> **DISCLAIMER:** work in progress! This repository was not yet tested in a real project and may lack functionality.

## Usecase

These days not every web app is api-driven and created using a frontend framework with nice tooling. HTML exists, which is rendered by a PHP/Java/Python/something process and you do not want to deep dive into that server process to write CSS and JavaScript.

So let us take [vite.js](https://vitejs.dev) and proxy our server-generated markup into the vite.js environment and have a snappy frontend developing experience.

A little configuration is needed, but then you are up and running.

In production you can execute `npm run build` and vite.js builds everything production ready.

> **DISCLAIMER:** right now, nothing is tested for production use. Please get in touch with [me](https://raoulkramer.de) if you run into trouble.

## How does the proxy work?

On non-production environments, [`vite.proxy.js`](./vite.proxy.js) will proxy the markup of the `proxy.config.json#target` into your vite hmr running browser. As long as the `proxied` page offers relative links `<a href="/relative-link">` and not `<a href="https://www.example.com/link">` you can navigate through the vite hmr session through the proxy-page.

Every CSS/JavaScript change you made will immediately land in your browser!

On the production system, the [vite.proxy.js](./vite.proxy.js#L20) script exports an empty function so no proxy code will be executed on production systems.

## setup

* Copy the content of this repository into your project.
* edit [proxy.config.json](./proxy.config.json) to your needs
* execute `npm install`
* execute `npm run dev`
* build your frontend

## Configuration

Have a look at the [`proxy.config.json`](./proxy.config.json) file and adjust the settings to your needs.

### target {String}
``` javascript
// proxy.config.json
{
	"target": "https://example.com"
}
```
Enter the URL you want to proxy into vite development server. Try `http://localhost:8000` if your application server is running there.

### proxyPath {String}
```javascript
// proxy.config.json
{
	"proxyPath": "/proxy/"
}
```
This value is used to _tunnel_ the data from the application server through. If this path exists as a real route in your application, you want to change it. Every URI-conform value is possible.

### addBaseTag {Boolean}
```javascript
// proxy.config.json
{
	"addBaseTag": true
}
```
This flags adds a `<base href="${proxyPath}">` to the vite js dev server DOM.

### proxyRewriteSelector {String}
```javascript
// proxy.config.json
{
	"proxyRewriteSelector": "[src^='/']"
}
```
This string is entered into `document.querySelectorAll()` call on the proxied markup to rewrite image-path(s) and other src attributes.

### proxyIgnoreTags {Array({String})}
```javascript
// proxy.config.json
{
	"proxyIgnoreTags": ["script"]
}
```
Every entry of this array will be `element.matches()` against every element queried by the `proxyrewriteSelector` result. If it succeeds the `src` attribute will not be prefixed with the `proxyPath`.

### proxyRoutes {Array[{Object}]}
``` javascript
{
	…,
	"proxyRoutes": [
		{
			"path": "/api/"
		}
	]
}
```
This array configures custom user proxy rules, for example to make your api route accesible to the vite process.

The simplest configuration is shown above, this route will be proxied 1:1 to your `target` configuration.

A more complex configuration looks like this:
``` javascript
{
	…,
	"proxyRoutes": [
		{
			"path": "/api/",
			"target": "https://www.example.com",
			"options": {
				"changeOrigin": true
			}
		}
	]
}
```
when you want to address a different `target` server for this route. All `options` will be merged into the proxy configuration of this `path`.
