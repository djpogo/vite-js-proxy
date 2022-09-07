import viteProxy from './vite-proxy/proxyBuilder';
import hmrInject from './vite-proxy/hmrInject';
export default {
	server: {
		proxy: {
			...viteProxy
		}
	},
  plugins:[ hmrInject() ]
}
