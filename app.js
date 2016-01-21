var five = require("johnny-five");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();
var board = new five.Board();

var expressInit = function() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', routes);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
};

board.on('ready', function() {
    console.log('arduino ready!');
    leds = {
        1: new five.Led(1),
        2: new five.Led(2),
        3: new five.Led(3),
        13: new five.Led(13)
    };
    expressInit();
});
expressInit();
module.exports = app;