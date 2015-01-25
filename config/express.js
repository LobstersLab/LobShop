var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swig = require('swig');
var lusca = require('lusca');

module.exports = function (app, config, passport) {
    //
    app.locals.cssFiles = [
        '/assets/css/bootstrap.css',
        '/assets/css/style.css'
    ];
    app.locals.jsFiles = [
        '/assets/bower_components/angular/angular.js',
        '/assets/bower_components/angular-bootstrap/ui-bootstrap.js',
        '/assets/bower_components/angular-route/angular-route.js',
        '/assets/bower_components/angular-resource/angular-resource.js',
        '/assets/bower_components/angular-cookies/angular-cookies.js',
        '/assets/bower_components/angular-animate/angular-animate.js',
        '/config.js',
        '/application.js',
        '/app/modules/core/module.js',
        '/app/modules/catalog/module.js',
        '/app/modules/shoppingCart/module.js',
        '/app/modules/users/module.js',
        '/app/shared/header/module.js',
        '/app/shared/menu/module.js',
        '/app/shared/product/module.js',
        '/app/shared/search/module.js',
        '/app/modules/core/configs/config.js',
        '/app/modules/core/configs/routes.js',
        '/app/modules/core/controllers/coreController.js',
        '/app/shared/header/controllers/headerController.js',
        '/app/shared/header/directives/headerNavigation.js'
    ];

    app.set('port', config.session);

    app.engine('html', swig.renderFile);

    // Set views path and view engine
    app.set('view engine', 'html');
    app.set('views', path.join(config.rootPath, 'server/views'));

    app.use(express.static(path.join(config.rootPath, 'public')));

    app.set('view cache', false);
    swig.setDefaults({
        cache: false,
        varControls: ['<%=', '%>']
    });

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
};
