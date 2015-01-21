
module.exports = function (app, passport) {
    var data = require('./../server/data');

    var routes = require('./../server/routes');
    var auth = require('./../server/routes/auth')(passport);
	
	var products = require('./../server/routes/api/products')(data);
	var brands = require('./../server/routes/api/brands')(data);

    app.use('/', routes);
    app.use('/auth', auth);
	app.use('/api/products', products);
	app.use('/api/brands', brands);
    
    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};