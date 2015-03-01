'use strict';

var config = require('./config');
var path = require('path');
var User = require('./../server/models/User/User');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (error, user) {
			done(error, user);
		});
	});

    // Initialize strategies
    config.getGlobbedFiles('./config/loginStrategies/**/*.js').forEach(function(strategy) {
        require(path.resolve(strategy))();
    });
};