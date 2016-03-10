var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: 'build',
		filename: '[hash].bundle.js',
		publicPath: 'build', //tells Webpack where to find built asset
	},
	external: {
		'$' : 'jquery'
	},
	debug: true,
	module: {
		loaders: [{
			test: /\.vue/,
			loader: 'vue-loader'
		}, {
			test: /\.js/,
			loader: 'babel-loader',
			query: {
     		presets: ['es2015', 'stage-0']
     		// presets用于设置开启的语法特性集合 http://babeljs.io/docs/plugins/#presets
    	},
    	exclude: 'node-modules/'
		}, {
			test: /\.json/,
			loader: 'json-loader'
		}, {
			test: /\.less/,
			loader: 'style-loader!css-loader!less-loader',
		}, {
			test: /\.jade/,
			loader: 'jade-loader'
		}, {
			test: /\.html/,
			loader: 'html-loader'
		}],
		exclude: /\*.md/
	},
	plugins: [new HtmlWebpackPlugin({
		template: './index.html',
		filename: 'index.html',
		inject: 'body',
		chunks: ['main'],
		cache: false
	})]
}