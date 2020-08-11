import {join} from 'path';
const WebpackShellPlugin = require('webpack-shell-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');

const include = join(__dirname, 'src');

module.exports =  {
    entry               : {
        "vff"           : "./src/index.js",
        "vff.min"       : "./src/index.js",
    },
    output              : {
        filename        : "[name].js",
        path            : join(__dirname, 'dist'),
        libraryTarget   : 'umd',
        library         : 'vff'
    },
    devtool             : false,
    module              : {
        rules         : [
            {
                test : /\.js$/,
                use : [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader'
                    }],
                include
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                   }],
                include
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }],
                include
            },
            {
                test : /\.json$/,
                use : 'json-loader',
                include
            }
        ]
    },
    plugins : [
        new MinifyPlugin({}, {
            include: /vff\.min\.js$/,
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
        })
    ]
};
