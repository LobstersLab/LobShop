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
var _ = require('lodash');
var glob = require('glob');

// TODO: Extract as config
var ASSETS = {
    lib: {
        css: [
            'public/assets/css/bootstrap.css',
            'public/assets/css/style.css'
        ],
        js: [
            'public/assets/bower_components/angular/angular.js',
            'public/assets/bower_components/angular-bootstrap/ui-bootstrap.js',
            'public/assets/bower_components/angular-route/angular-route.js',
            'public/assets/bower_components/angular-resource/angular-resource.js',
            'public/assets/bower_components/angular-cookies/angular-cookies.js',
            'public/assets/bower_components/angular-animate/angular-animate.js'
        ]
    },
    css: [
        'public/app/modules/*/css/*.css',
        'public/app/shared/*/css/*.css'
    ],
    js: [
        'public/config.js',
        'public/application.js',
        'public/app/modules/*/*.js',
        'public/app/modules/*/*[!tests]*/*.js',
        'public/app/shared/*/*.js',
        'public/app/shared/*/*[!tests]*/*.js'
    ],
    tests: [
        //'/assets/bower_components/angular-mocks/angular-mocks.js',
        'public/app/modules/*/tests/*.js',
        'public/app/shared/*/tests/*.js'
    ]
}

module.exports = function (app, config, passport) {

    app.locals.cssFiles = getCSSAssets();
    app.locals.jsFiles = getJavaScriptAssets();

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
};

// TODO: Extract in separate config file

function getGlobbedFiles  (globPatterns, removeRoot) {
    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob(globPatterns, {
                sync: true
            }, function(err, files) {
                if (removeRoot) {
                    files = files.map(function(file) {
                        return file.replace(removeRoot, '');
                    });
                }

                output = _.union(output, files);
            });
        }
    }

    return output;
}

function getJavaScriptAssets (includeTests) {
    var output = getGlobbedFiles(ASSETS.lib.js.concat(ASSETS.js), 'public/');

    // To include tests
    if (includeTests) {
        output = _.union(output, getGlobbedFiles(ASSETS.tests));
    }

    return output;
}

function getCSSAssets () {
    var output = getGlobbedFiles(ASSETS.lib.css.concat(ASSETS.css), 'public/');
    return output;
}