var path = require('path');

module.exports = {
	// devtool: '#inline-source-map',
	debug: false,
	output: {
		filename: 'app.js',
		publicPath: './assets/'
	},
	resolve: {
		modulesDirectories: ['modules', 'node_modules'],
		root: path.join(__dirname, '/src/modules'),
		extensions: ['', '.js', '.json']
	},
	module: {
		loaders: [
			{ test: /\.html$/, loader: 'mustache' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: '6to5-loader?experimental&comments=false'
			}
		]
	}
};
