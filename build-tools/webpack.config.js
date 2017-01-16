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
            // Enable React hot loader for HMR
            'react-hot-loader/patch',
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
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: path.join(__dirname, '..', 'src')
            }
        ],
        loaders: [
            {
                test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                },
                exclude: /node_modules/,
                include: path.join(__dirname, '..', 'src')
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=200000'
            }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['src', 'node_modules', 'styles']
    },
    eslint: {
        configFile: './.eslintrc'
    }
}
