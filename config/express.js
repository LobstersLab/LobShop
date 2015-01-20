var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swig = require('swig');
var lusca = require('lusca');

module.exports = function (app, config, passport) {
    app.set('port', config.session);

    app.engine('html', swig.renderFile);

    // Set views path and view engine
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, './../server/views'));

    app.set('view cache', false);
    swig.setDefaults({cache: false});

    app.use(favicon());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());

    app.use(session(config.session));
    app.use(passport.initialize());
    app.use(passport.session());

    // Lusca security configuration
    if (config.env == 'production') {
        app.use(lusca.csrf());
        app.use(lusca.csp({/* ... */}));
        app.use(lusca.xframe('SAMEORIGIN'));
        app.use(lusca.p3p('ABCDEF'));
        app.use(lusca.hsts({maxAge: 31536000}));

        app.use(lusca.xssProtection(true));
    }

    app.use(require('less-middleware')(path.join(__dirname, 'public')));
    app.use('/', express.static(path.join(__dirname, 'public')));
};