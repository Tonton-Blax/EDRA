import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import url from '@rollup/plugin-url'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import copy from 'rollup-plugin-copy'
import image from "svelte-image";

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const responsiveImages= [
	image({
		optimizeAll: true, // optimize all images discovered in img tags
		inlineBelow: 10000, // inline all images in img tags below 10kb
		compressionLevel: 5, // png quality level
		quality: 50, // jpeg/webp quality level
		tagName: "Image", // default component name
		sizes: [400, 600, 1200], // array of sizes for srcset in pixels
		breakpoints: [480, 768, 1024], // array of screen size breakpoints at which sizes above will be applied
		outputDir: "g/",
		placeholder: "trace", // or "blur",
		webpOptions: {
		  // WebP options [sharp docs](https://sharp.pixelplumbing.com/en/stable/api-output/#webp)
		  quality: 75,
		  lossless: false,
		  force: true,
		},
		webp: true,
		trace: {
		  // Potrace options for SVG placeholder
		  background: "#fff",
		  color: "#002fa7",
		  threshold: 120,
		},
		processFolders: ["img/initial", "img/uploads"],
		processFoldersRecursively: true,
		processFoldersSizes: true
	}),
]

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	warning.code === 'THIS_IS_UNDEFINED' ||
	onwarn(warning)

const preprocesses = sveltePreprocess({
	scss: {
		includePaths: ['src'],
	},
	postcss: {
		plugins: [require('autoprefixer')],
	},
})

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				preventAssignment : true,
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			copy({
				targets: [
					{
						src: 'node_modules/@fortawesome/fontawesome-free/webfonts',
						dest: config.client.output().dir,
					},
					{
						src: 'robots.txt',
						dest: config.client.output().dir,
					},
				]
			}),
			svelte({
				preprocess: [preprocesses, ...responsiveImages],
				compilerOptions: {
					dev,
					hydratable: true,
				},
			}),
			url({
				sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
				publicPath: '/client/',
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),

			legacy &&
				babel({
					extensions: ['.js', '.mjs', '.html', '.svelte'],
					babelHelpers: 'runtime',
					exclude: ['node_modules/@babel/**'],
					presets: [
						[
							'@babel/preset-env',
							{
								targets: '> 0.25%, not dead',
							},
						],
					],
					plugins: [
						'@babel/plugin-syntax-dynamic-import',
						[
							'@babel/plugin-transform-runtime',
							{
								useESModules: true,
							},
						],
					],
				}),

			!dev &&
				terser({
					module: true,
				}),
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				preventAssignment : true,
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				preprocess: [preprocesses, ...responsiveImages],
				compilerOptions: {
					dev,
					generate: 'ssr',
					hydratable: true,
				},
				emitCss: false,
			}),
			url({
				sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
				publicPath: '/client/',
				emitFiles: false, // already emitted by client build
			}),
			resolve({
				dedupe: ['svelte'],
			}),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),

		preserveEntrySignatures: 'strict',
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				preventAssignment : true,
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			commonjs(),
			!dev && terser(),
		],

		preserveEntrySignatures: false,
		onwarn,
	},
}
