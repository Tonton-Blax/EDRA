const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
//const purgecss = require('@fullhuman/postcss-purgecss')


const mode = process.env.NODE_ENV;
const dev = mode === "development";

const config = {
	plugins: [
        autoprefixer(),
        !dev && cssnano({
			    preset: "default",
		    }),
        //purgecss({ 
          //content: ["./src/**/*.svelte","./.svelte-kit/**/*.svelte", "./.svelte-kit/**/*.html"],
          //whitelistPatterns: [/svelte-/, /fa-icon/],
          //defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        //})
    ],
};

module.exports = config;