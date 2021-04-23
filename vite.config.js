import viteProxy from './vite-proxy/proxyBuilder';

export default {
	server: {
		proxy: {
			...viteProxy
		}
	}
}
