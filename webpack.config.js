const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const proxyHost = 'http://shiva.redpillnow.com';

module.exports = {
	entry: './now-confirm-dialog.ts',
	output: {
		filename: 'now-confirm-dialog.js',
		path: path.resolve(__dirname),
		publicPath: './'
	},
	target: 'node',
	devtool: 'source-map',
	mode: 'development',
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	module: {
		rules: [
			{test: /\.ts/, use: 'ts-loader'},
			{
				test: /\.(png|svg|jp(e*)g|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000,
						name: 'images/[hash]-[name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [new CleanWebpackPlugin(['./'])],
	devServer: {
		contentBase: './',
		https: false,
		proxy: {
			cookieDomainRewrite: proxyHost,
			'/api': {
				target: proxyHost,
				secure: false
			},
			'/names.nsf': {
				target: proxyHost,
				secure: false
			},
			'/redpill/digaconf.nsf': {
				target: proxyHost,
				secure: false
			},
			'/redpill/update.nsf': {
				target: proxyHost,
				secure: false
			}
		}
	}
};
