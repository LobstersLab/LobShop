
module.exports = function (app, passport) {
    var data = require('./../server/data');

    var routes = require('./../server/routes');
    var auth = require('./../server/routes/auth')(passport);
    var emails = require('./../server/routes/emails');

	var products = require('./../server/routes/api/products')(data);
    var brands = require('./../server/routes/api/brands')(data);
    var categories = require('./../server/routes/api/categories')(data);
    var users = require('./../server/routes/api/users')(data);
    var orders = require('./../server/routes/api/orders')(data);

    app.use('/', routes);
    app.use('/auth', auth);
    app.use('/emails', emails);
	app.use('/api/products', products);
    app.use('/api/brands', brands);
    app.use('/api/categories', categories);
    app.use('/api/users', users);
    app.use('/api/orders', orders);

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};