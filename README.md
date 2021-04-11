# vite-js-proxy

Use the super powers of [vite.js](https://vitejs.dev)🚀 to frontend tool any running website.

## Usecase

You have classic server side rendered website driven by Java/PHP/something else and you want to add the lightweight, fast frontend tooling vite.js offers?

You setup your **donor host** whose markup you want to style. For local development a proxy is setup, that you can navigate through the **donor host site** but **css and js is injected via vite.js** and thus really speedy.

For production you can execute `npm run build` and vite.js builds everything production ready.

Before vite.js you may have had a webpack or rollup config within your project to build and run your frontend.
Now it is the same, but blazingly fast.

## How does the proxy work?

On non production environments `[vite.proxy.js](./vite.proxy.js)` will proxy the markup of the `PROXY_HOST` into your vite hmr running browser. As long as the `proxied` page offers relative links `<a href="/relative-link">` and not `<a href="https://www.example.com/link">`, you are able to navigate though the vite hmr session through the proxy-page.

## Configuration

Have a look at the `[proxy.config.json](./proxy.config.json)` file and adjust the settings to your needs.

### target {String}
``` javascript
// proxy.config.json
{
	"target": "https://example.com"
}
```
Enter the URL you want to proxy into vite development server. For example `http://localhost:8000` if your application server is running there.

### proxyPath {String}
```javascript
// proxy.config.json
{
	"proxyPath": "/proxy/"
}
```
This is the path, where the vite js dev server will proxy the application server data through. Make sure that this path does not exists as a real path in your application, otherwise it will come to conflicts between the vite dev server and your application server.

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
This string is entered into `document.querySelectorAll()` call on the proxied markup, to rewrite image-path(s) and other src attributes.

### proxyIgnoreTags [Array({String})]
```javascript
// proxy.config.json
{
	"proxyIgnoreTags": ["script"]
}
```
Every entry of this array, will be `element.matches()` against every element queried by the `proxyrewriteSelector` result. If it succeed the `src` attribute will not be prefixed with the `proxyPath`.
