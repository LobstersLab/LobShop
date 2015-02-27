var _ = require('lodash');
var glob = require('glob');

var environment = process.env.NODE_ENV || 'development';
var config = _.extend(require('./environments/' + environment));

var ASSETS = {
    lib: {
        css: [
            'public/assets/css/reset.css',
            'public/assets/css/bootstrap.css',
            'public/assets/css/bootstrap-theme.css',
            'public/assets/css/animate.min.css',
            'public/assets/css/style.css',
            'public/assets/css/rzslider.css'
        ],
        js: [
            'public/assets/bower_components/angular/angular.js',
            'public/assets/bower_components/angular-bootstrap/ui-bootstrap.js',
            'public/assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'public/assets/bower_components/angular-route/angular-route.js',
            'public/assets/bower_components/angular-resource/angular-resource.js',
            'public/assets/bower_components/angular-cookies/angular-cookies.js',
            'public/assets/bower_components/angular-animate/angular-animate.js',
            'public/assets/bower_components/angular-ui-utils/validate.js',
            'public/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
            'public/assets/bower_components/ng-file-upload/angular-file-upload.js',
            'public/assets/bower_components/ng-file-upload/angular-file-upload-shim.js',
            'public/assets/js/rzslider.js'
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
};

config.environment = environment;

config.getGlobbedFiles = function (globPatterns, removeRoot) {
    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, config.getGlobbedFiles(globPattern, removeRoot));
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
};

config.getJavaScriptAssets = function (includeTests) {
    var output = config.getGlobbedFiles(ASSETS.lib.js.concat(ASSETS.js), 'public/');

    // To include tests
    if (includeTests) {
        output = _.union(output, config.getGlobbedFiles(ASSETS.tests));
    }

    return output;
};

config.getCSSAssets = function () {
    var output = config.getGlobbedFiles(ASSETS.lib.css.concat(ASSETS.css), 'public/');
    return output;
};

config.facebook = {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
        clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
        callbackURL: '/auth/facebook/callback'
};

config.twitter = {
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
        clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
        callbackURL: '/auth/twitter/callback'
};

config.google = {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
        clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
        callbackURL: '/auth/google/callback'
};

config.linkedin = {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: '/auth/linkedin/callback'
};

module.exports = config;