const config = require('dotenv').config();
const proxyTarget = process.env.PROXY_TARGET;
const proxyPath = process.env.PROXY_PATH;

const proxy = {};
proxy[proxyPath] = {
    target: proxyTarget,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${proxyPath}`), ''),
};

export default {
    server: {
        proxy
    }
}