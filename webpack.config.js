const path = require("path");
const extract_text_plugin = require("extract-text-webpack-plugin");

module.exports = (env) => {

	const is_production = env === "production";
	const css_extract = new extract_text_plugin("styles.css");
	
	return {
		entry:"./src/app.js",
		output:{
			path:path.join(__dirname, "public"),
			filename:"bundle.js"
		},
		module:{
			rules:[{
				loader:"babel-loader",
				test:/\.js$/,
				exclude: /node_modules/
			},{
				test:/\.s?css$/,
				/*use:[
					"style-loader",
					"css-loader",
					"sass-loader"
				]*/
				use: css_extract.extract({
					/*use:[
						 "css-loader",
						 "sass-loader"
					 ]*/
					 use:[
						{
							loader:"css-loader",
							options: {
								sourceMap:true
							}
						},
						{
							loader:"sass-loader",
							options: {
								sourceMap:true
							}
						}
					]
				 })
			}]
		},
		plugins:[
			css_extract
		],
		//devtool: is_production ? "source-map" : "cheap-module-eval-source-map",
		devtool: is_production ? "source-map" : "inline-source-map",
		devServer:{
			contentBase:path.join(__dirname, "public"),
			historyApiFallback:true
		},
		performance: {hints: false}
	}
}