var path = require('path')
var webpack = require('webpack')


module.exports = {
    devtool: 'eval',
    entry: {
        index: [
            'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://' + process.env.WEBPACK_HOST + ':' + process.env.WEBPACK_PORT,
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            './src/index'
            // Main file : entry point of application
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
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: path.join(__dirname, '..', 'src'),
                options: {
                    configFile: './.eslintrc',
                    emitWarning: true
                }
            },
            {
                test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {limit: 100000}
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                exclude: /node_modules/,
                include: path.join(__dirname, '..', 'src')
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {limit: 200000}
            }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['src', 'node_modules', 'styles']
    }
}
