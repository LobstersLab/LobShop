'use strict';

var passport = require('passport');
var UsersController = require('./../../server/controllers/Users/UsersController');
var TwitterStrategy = require('passport-twitter').Strategy;
var twitterConfig = {
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
    callbackURL: '/auth/twitter/callback'
};

module.exports = function() {
    // Use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: twitterConfig.clientID,
            consumerSecret: twitterConfig.clientSecret,
            callbackURL: twitterConfig.callbackURL,
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
            // UsersController.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};