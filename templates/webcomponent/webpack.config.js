const path = require('path');
const webpack = require('webpack');

// console.log(PluginClassProperties)

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
	// mode: 'development',
	// mode: 'production',
	entry: './src/index.js',

	output: {
		// filename: '[name].[chunkhash].js',
		filename: 'index.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html'),
			filename: 'index.html'
		})
	],

	resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      "node_modules"
    ],
    // directories where to look for modules
    extensions: [".js", ".json", ".jsx", ".css"],
    // extensions that are used

    /* Alternative alias syntax (click to show) */
    /* Advanced resolve configuration (click to show) */
  },

	module: {
		rules: [
			{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
			{
				test: /.(js|jsx)$/,
				include: [
					path.resolve(__dirname, 'src'),
					// /lighthouse-di-common/,
					// path.resolve(__dirname, './node_modules/@ali/lighthouse-di-common')
				],
				// exclude: [/node_modules/],
				loader: 'babel-loader',

				options: {
					plugins: [
						'syntax-dynamic-import',
						"@babel/plugin-proposal-class-properties",
					],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						],
						["@babel/preset-react"],
						// ["@babel/preset-stage-1"],
					]
				}
			}
		]
	},

	optimization: {
		usedExports: true,
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		'moment': 'moment',
    "ant-design-pro": "ant-design-pro",
    "antd": "antd",
    "bizcharts": "BizCharts"
  },

	devServer: {
		open: true,
		host: 'local.test.com'
	}
};
