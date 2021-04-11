const {
	proxyPath,
	target
} = require('./proxy.config.json');

const proxy = {};
proxy[proxyPath] = {
    target: target,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${proxyPath}`), ''),
};

export default {
    server: {
        proxy
    }
}
