/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['gsap']);

const nextConfig = {
	...withTM,
	output: 'export',
	images: {
		loader: 'custom',
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	},
	transpilePackages: ['next-image-export-optimizer','lumina-node-wasm'],
	env: {
		nextImageExportOptimizer_imageFolderPath: 'public/images',
		nextImageExportOptimizer_exportFolderPath: 'out',
		nextImageExportOptimizer_quality: '75',
		nextImageExportOptimizer_storePicturesInWEBP: 'true',
		nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',

		// If you do not want to use blurry placeholder images, then you can set
		// nextImageExportOptimizer_generateAndUseBlurImages to false and pass
		// `placeholder="empty"` to all <ExportedImage> components.
		nextImageExportOptimizer_generateAndUseBlurImages: 'true',
	},
	reactStrictMode: true,
	trailingSlash: true,
	images: {
		unoptimized: true,
		disableStaticImages: false,
		domains: ['picsum.photos', 'placehold.it', 'datocms-assets.com'],
	},
	compiler: {
		// see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
		styledComponents: true,
	},
	// webpack(config, options) {
	// 	config.module.rules.push({
	// 		test: /\.worker\.js$/,
	// 		loader: 'worker-loader',
	// 		// options: { inline: true }, // also works
	// 		options: {
	// 			name: 'static/media/worker.[hash].js',
	// 			publicPath: '/_next/',
	// 		},
	// 	});
	// 	return config
	// }
};

module.exports = nextConfig;