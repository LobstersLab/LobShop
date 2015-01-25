'use strict';

var passport = require('passport');
var UsersController = require('./../../server/controllers/Users/UsersController');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/auth/facebook/callback'
}

module.exports = function() {
    // Use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: facebookConfig.clientID,
            clientSecret: facebookConfig.clientSecret,
            callbackURL: facebookConfig.callbackURL,
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
                provider: 'facebook',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            // Save the user OAuth profile
            // UsersController.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};