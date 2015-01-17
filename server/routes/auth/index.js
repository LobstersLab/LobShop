/**
 * This module includes the route configs for the authentication module.
 * 
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

module.exports = function (passport) {
    var auth = require('./../../libs/auth')(passport);
    	
    router.post('/login', auth.login);
	router.post('/signup', auth.signup);
	router.get('/logout', auth.logout);

	return router;
};