'use strict';

var passport = require('passport');
var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    var AuthenticationController = require('./../../controllers/Authentication/AuthenticationController')(passport);

    router.post('/login', AuthenticationController.login);
	router.post('/signup', AuthenticationController.signup);
	router.get('/logout', AuthenticationController.logout);

    // Setting the facebook oauth routes
    router.get('/facebook', passport.authenticate('facebook', {
        scope: ['email']
    }));
    router.get('/facebook/callback', AuthenticationController.oauthCallback('facebook'));

    // Setting the twitter oauth routes
    router.get('/twitter', passport.authenticate('twitter'));
    router.get('/twitter/callback', AuthenticationController.oauthCallback('twitter'));

    // Setting the google oauth routes
    router.get('/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    router.get('/google/callback', AuthenticationController.oauthCallback('google'));

    // Setting the linkedin oauth routes
    router.get('/linkedin', passport.authenticate('linkedin'));
    router.get('/linkedin/callback', AuthenticationController.oauthCallback('linkedin'));

	return router;
};