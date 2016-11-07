var path = require('path')
var webpack = require('webpack')

var devServerHost = process.env.WEBPACK_HOST || '0.0.0.0'
var devServerPort = process.env.WEBPACK_PORT || '3000'

module.exports = {
    devServerHost: devServerHost,
    devServerPort: devServerPort,
    devtool: 'eval',
    entry: {
        index: [
            // Enable automatic refresh https://webpack.github.io/docs/webpack-dev-server.html#automatic-refresh
            'webpack-dev-server/client?http://' + devServerHost + ':' + devServerPort,
            // Enable Hot Module Replacement
            'webpack/hot/only-dev-server',
            // Main file : entry point of application
            './src/index'
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'app.js',
        publicPath: '/static'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/,
                include: path.join(__dirname, '..', 'src')
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=200000'
            }]
    },
    resolve: {
        extensions: ['', '.react.js', '.js', '.jsx'],
        modulesDirectories: ['src', 'node_modules', 'styles']
    }
}
