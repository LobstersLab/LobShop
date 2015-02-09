'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

module.exports = function (passport) {
    var AuthenticationController = require('./../../controllers/Authentication/AuthenticationController')(passport);

    router.post('/login', AuthenticationController.login);
	router.post('/signup', AuthenticationController.signup);
	router.get('/logout', AuthenticationController.logout);

	return router;
};