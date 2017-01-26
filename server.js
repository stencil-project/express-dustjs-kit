var express = require('express');
var helmet = require('helmet');
var adaro = require('adaro');
var path = require('path');

/******************************************************************************
 * security/sanitation, view engine, config, etc
/******************************************************************************/
var server = express();
var options = {
    helpers: [
        function (dust) { dust.helpers.myHelper = function (a, b, c, d) {} },
        'dustjs-helpers'
    ]
};

server.engine('dust', adaro.dust(options));
server.set('view engine', 'dust');
server.set('views', path.resolve(__dirname, './views'));

server.use(helmet());
server.use(helmet.noCache());
server.use(helmet.hidePoweredBy({
    setTo: 'PHP 4.2.0'
}));
server.use(helmet.frameguard({
    action: 'deny'
}));

// static files
server.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/******************************************************************************
 * Routes
/******************************************************************************/
var homeRoutes = require('./home/routes');
var aboutRoutes = require('./about/routes');

server.use('/home', homeRoutes);
server.use('/about', aboutRoutes);
server.get('/', function(req, res) {
    res.redirect(301, '/home');
});
server.use(function(req, res) {
    var error = new Error('Invalid URL request ' + req.originalUrl);

    console.log(error);

    res.status(404).send(error.message);
});

module.exports = server;
