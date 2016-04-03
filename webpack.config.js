var HtmlWebpackPlugin = require('html-webpack-plugin')
	
module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: 'build',
		filename: '[hash].bundle.js',
		publicPath: 'build/', //tells Webpack where to find built asset
	},
	externals: {
		'jquery' : 'jQuery'
	},
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
		}, {
			test: /\.svg/,
			loader: 'raw-loader'
		}, {
			test: /\.woff$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff"
		}, {
			test: /\.ttf$/,
			loader: "url-loader?limit=10000&mimetype=application/octet-stream"
		}, {
			test: /\.eot$/,
			loader: "file-loader"
		}, {
			test: /\.svg$/,
			loader: "url-loader?limit=10000&mimetype=image/svg+xml" 
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