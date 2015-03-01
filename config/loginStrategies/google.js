'use strict';

var passport = require('passport');
var config = require('./../config');
var AuthenticationController = require('./../../server/controllers/Authentication/AuthenticationController');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
    // Use google strategy
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the user OAuth profile
            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'google',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            // Save the user OAuth profile
            AuthenticationController.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};