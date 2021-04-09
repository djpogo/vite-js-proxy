# vite-proxy

Use the super powers of [vite.js](https://vitejs.dev) to frontend tool any running website.

## Usecase

You have classic server side rendered website driven by Java or PHP and you want to add the lightweight, fast frontend tooling vite.js offers?

You setup your **donor host** whose markup you want to style. For local development a proxy is setup, that you can navigate through the **donor host site** but **css and js is injected via vite.js** and thus really speedy.

For production you can execute `npm run build` and vite.js builds everything production ready.

Before vite.js you may have had a webpack or rollup config within your project to build and run your frontend.
Now it is the same, but blazingly fast.

## How does the proxy work?

On non production enviroments `[vite.proxy.js](./vite.proxy.js)` will proxy the markup of the `PROXY_HOST` into your vite hmr running browser. As long as the `proxied` page offers relative links `<a href="/relative-link">` and not `<a href="https://www.example.com/link">`, you are able to navigate though the vite hmr session through the proxy-page.

## Configuration

make a copy of the `.env` file and provide the neccessary values.

### PROXY_TARGET

`PROXY_TARGET` defines the url of the website you want to be proxied into your browser.

for example `PROXY_TARGET=https://www.exmaple.com`.

### PROXY_PATH

`PROXY_PATH` defines the _local_ path vite-proxy will use to call the running website.

for example `PROXY_PATH=/proxy/`.

The `PROXY_PATH` property will be removed when calling the website.