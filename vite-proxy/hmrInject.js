const hmrInject = () => {
  return {
    name: 'inject-loader',
    enforce: "pre",
    apply: "serve",
    transformIndexHtml(html) {
      return [
        { tag: "script", attrs:{type:'module', src:'./vite-proxy/loadPage.js'}},
        { tag: "script", attrs:{type:'module'}, children:"import loadPage from './vite-proxy/loadPage';loadPage();" }
      ];

    }
  }
}

export default hmrInject;
