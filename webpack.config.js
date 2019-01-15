const path = require('path');

module.exports = {
	entry: './now-confirm-dialog.ts',
	output: {
		filename: 'now-confirm-dialog.js',
		path: path.resolve(__dirname),
		publicPath: './'
	},
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
	}
};
