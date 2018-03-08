var path = require('path');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    cache: true,
    entry: {        
        index: path.join(__dirname, "src/index.tsx"),
        },
    devtool: "source-map",
    stats: {
        warnings: false,
        children: false
    },
    output: {
        filename: "[name].js"
    },
    resolve: {
        
                modules: [ path.join(__dirname, 'node_modules')],
        
                // Add '.ts' and '.tsx' as resolvable extensions.
                extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css", ".less", ".png", ".woff2"]
            },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use:[
                    {
                        loader:"awesome-typescript-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.tsx$/,
                use:[
                    {
                        loader:"awesome-typescript-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [    
                    { loader: "style-loader" },               
                    { loader: "css-loader" }                          
                ]
            },
            {
                test: /\.ttf$/,
                use:[
                    { loader: "url-loader" }          
                ]
            },
            {
                test: /\.woff$/,
                use:[
                    { loader: "url-loader" }          
                ]
            },
            {
                test: /\.woff2$/,
                use:[
                    { loader: "url-loader" }          
                ]
            },
            {
                test: /\.eot$/,
                use:[
                    { loader: "url-loader" }          
                ]
            },
            {
                test: /\.svg$/,
                use:[
                    { loader: "url-loader" }          
                ]
            },
            {
                test: /\.png$/,
                use: [
                    { loader: "url-loader" }
                ]
            },
            {
                test: /\.jpg$/,
                use: [
                    { loader: "url-loader" }
                ]
            },
            {
                test: /\.less$/,
                use:[
                    { loader: "style-loader" },               
                    { loader: "css-loader" },
                    { loader: "less-loader" }          
                ]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new ExtractTextPlugin("css/[name].css"),
    ]
}