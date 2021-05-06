/** @type {import('@sveltejs/kit').Config} */
const adapter = require('@sveltejs/adapter-static');

module.exports = {
	kit: {
		adapter: adapter({
			fallback: '200.html'
		}),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
