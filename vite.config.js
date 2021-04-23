import proxy from './vite-proxy/proxyBuilder';

export default {
	server: {
		proxy: {
			...proxy
		}
	}
}
