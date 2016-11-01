var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');

new WebpackDevServer(webpack(config), {
    contentBase: path.join(__dirname, '..', 'src'),
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: {
        colors: true
    },
}).listen(config.devServerPort, config.devServerHost, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at ' + config.devServerHost + ':' + config.devServerPort);
});
