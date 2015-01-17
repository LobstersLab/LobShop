/**
 * Here you can define some basic routes and the index route.
 * Also you can define here some common middlewares (ex. 404 error handling)
 * 
 */

var express = require('express');
var path = require('path');
var router = express.Router();

var auth = require('./../libs/auth')();

var environments = {
	dev: 'development',
	prod: 'production'
};

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;

// Render front-end jade views
router.get('/partials/:partialArea/:partialName', function (req, res) {
    res.render('../public/app/' + req.params.partialArea + '/partials/' + req.params.partialName);
    //res.render('../public/app/' + req.params.partialArea + '/views/' + req.params.partialName);
});