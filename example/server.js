const express = require('express')
const net = require('net')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const app = express()

portIsOccupied(process.env.PORT || 8080).then(port => {

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: '/__build__/',
        stats: {
            colors: true,
            chunks: false
        }
    }))


    app.use(webpackHotMiddleware(compiler))

    app.use(express.static(__dirname))


    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
    });
})

function portIsOccupied(port) {
    return new Promise((resolve, reject) => {
        var server = net.createServer().listen(port);
        server.on('listening', function () {
            server.close();
            resolve(port);
        });

        server.on('error', async function (err) {
            if (err.code === 'EADDRINUSE') {
                console.log('The port【' + port + '】 is occupied, please change other port.');
                resolve(await portIsOccupied(port + 1));
            }
        });
    });
}
