var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var config = require('./webpack.config')


new WebpackDevServer(webpack(config), {
    contentBase: path.join(__dirname, '..', 'src'),
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: {
        colors: true,
        errorDetails: true
    },
}).listen(process.env.WEBPACK_PORT, process.env.WEBPACK_HOST, function (err/*, result*/) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at ' + process.env.WEBPACK_HOST + ':' + process.env.WEBPACK_PORT);
});
