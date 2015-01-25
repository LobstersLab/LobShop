'use strict';

var passport = require('passport');
var UsersController = require('./../../server/controllers/Users/UsersController');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var linkedInConfig = {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/auth/linkedin/callback'
};

module.exports = function() {
    // Use linkedin strategy
    passport.use(new LinkedInStrategy({
            consumerKey: linkedInConfig.clientID,
            consumerSecret: linkedInConfig.clientSecret,
            callbackURL: linkedInConfig.callbackURL,
            passReqToCallback: true,
            profileFields: ['id', 'first-name', 'last-name', 'email-address']
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
                provider: 'linkedin',
                providerIdentifierField: 'id',
                providerData: providerData
            };

            // Save the user OAuth profile
            // UsersController.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};