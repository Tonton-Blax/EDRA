import adapter from '@sveltejs/adapter-static';

import preprocess from "svelte-preprocess";
import viteCompression from 'vite-plugin-compression';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#edra',
        adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	},
	
	
	vite: () => ({
		plugins: [
			viteCompression(),
		]
	}),
	
    preprocess: [preprocess({postcss: true})]
};

export default config;
