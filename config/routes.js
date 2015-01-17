
module.exports = function (app, passport) {
    var data = require('./../server/data');

    var routes = require('./../server/routes');
    var auth = require('./../server/routes/auth')(passport);

 

    app.use('/', /* add authentication */ routes);
    app.use('/auth', auth);
    
    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};