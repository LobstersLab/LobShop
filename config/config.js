var _ = require('lodash');
var glob = require('glob');

var environment = process.env.NODE_ENV || 'development';
var config = _.extend(require('./environments/' + environment));

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

module.exports = config;