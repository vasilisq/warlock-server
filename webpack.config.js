var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './client/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        //publicPath: './build/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'client'),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            { 
                test: /node_modules\/bootstrap\/dist\/js\//,
                //include: path.join(__dirname, 'node_modules/bootstrap/dist/js'),
                loader: 'imports?jQuery=jquery'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'jquery': 'jquery/dist/jquery.js'
        }
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        proxy: {
            '*': 'http://localhost:8080'
        },
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        new ExtractTextPlugin('style.css')
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ])
}
