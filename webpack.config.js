const path = require('path');
const build = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

// typing
module.exports = {
	entry: './Client/index.js', // where our entry point to the program is
	output: {
		path: path.resolve(__dirname, 'build'), // setting up directory name
		filename: 'bundle.js', // this is where our bundle will be, inside the build folder
	},
	mode: process.env.NODE_ENV, // whether we are in production or development mode
	module: {
		rules: [
			// where we set up transpiling
			{
				test: /\.jsx?/,
				exclude: /node_modules/, // skip them because we assume they aren't written in jsx
				use: {
					loader: 'babel-loader', // the loader that transpiles jsx
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						// transpiling es6 into es5 and react into readbable js
						// presets fire in reverse order
					},
				},
			},
			{
				test: /\.s?[ac]ss/,
				use: [
					MiniCssExtractPlugin.loader, // best for production . alternative to style-loader
					//'style-loader', // best for dev, directly inject css into DOM via <style> tag
					'css-loader', // resolve all css into a single string
					'sass-loader', // transpile sass/scss into cs
					'postcss-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		port: 8080,
		historyApiFallback: true,
		proxy: {
			// '/': 'http://localhost:3000',
			/* 
        Can't use '/' catchall proxying with React Router. Hardcode child endpoints 
        to proxy for to avoid both React Router and express server trying to route 
        for the same endpoints,'/test' being a second example of a child endpoint.
      */
			'/oauth': 'http://localhost:3000',
			'/sql': 'http://localhost:3000',
			'/user': 'http://localhost:3000',
		},
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			// used to create a index file that is connected to our dynamically generated javascript
			template: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new Dotenv(),
	],
};
