'use strict';

var passport = require('passport');
var config = require('./../config');
var AuthenticationController = require('./../../server/controllers/Authentication/AuthenticationController');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function() {
    // Use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL,
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;
            providerData.token = token;
            providerData.tokenSecret = tokenSecret;

            // Create the user OAuth profile
            var providerUserProfile = {
                displayName: profile.displayName,
                username: profile.username,
                provider: 'twitter',
                providerIdentifierField: 'id_str',
                providerData: providerData
            };

            // Save the user OAuth profile
            AuthenticationController.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};