const {
	proxyPath,
	target,
	proxyRoutes
} = require('../proxy.config.json');

const proxy = {};
/* check for user defined proxy routes */
if (proxyRoutes) {
	const pRoutes = Array.isArray(proxyRoutes) ? proxyRoutes : [proxyRoutes];
	pRoutes.forEach(additionalProxy => {
		proxy[additionalProxy.path] = {
			target: additionalProxy.target ?? target,
			changeOrigin: true,
			...(additionalProxy.options ?? {})
		}
	});
}

/* add markup tunnel proxy */
proxy[proxyPath] = {
	target,
	changeOrigin: true,
	rewrite: (path) => path.replace(new RegExp(`^${proxyPath}`), ''),
};

export default proxy;
