var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swig = require('swig');
var lusca = require('lusca');
var morgan = require('morgan');
var config = require('./config');

module.exports = function (app, passport) {
    app.locals.cssFiles = config.getCSSAssets();
    app.locals.jsFiles = config.getJavaScriptAssets();

    app.set('port', config.session);

    // Set views path and view engine
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(config.rootPath, 'server/views'));

    // Swig template engine configurations
    app.set('view cache', false);
    swig.setDefaults({
        cache: false,
        varControls: ['<%=', '%>']
    });

    // Setting static folder to serve
    app.use(express.static(path.join(config.rootPath, 'public')));


    app.use(favicon());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());

    // Configure session management
    app.use(session(config.session));

    // Initialize passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Enable logger (morgan) and set where to save the logs
    var LOGS_PATH = config.rootPath + '/logs';

    if (!fs.existsSync(LOGS_PATH)) {
        fs.mkdirSync(LOGS_PATH);
    }

    var accessLogStream = fs.createWriteStream(LOGS_PATH + '/access.log', {flags: 'a'});

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    else {
        app.use(morgan('combined', {
            stream: accessLogStream
        }));
    }

    // Lusca security configuration
    if (config.env == 'production') {
        app.use(lusca.csrf());
        app.use(lusca.csp({/* ... */}));
        app.use(lusca.xframe('SAMEORIGIN'));
        app.use(lusca.p3p('ABCDEF'));
        app.use(lusca.hsts({maxAge: 31536000}));
        app.use(lusca.xssProtection(true));
    }

    // Access-Control-Allow-Origin headers configuration
    app.use(function (req, res, next) {

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Custom-Header, Content-Type, Authorization, Content-Length, X-Requested-With');

        next();
    });
};