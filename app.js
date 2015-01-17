var express = require('express');
var passport = require('passport');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/environments/'+ env +'.js');

var app = express();

require('./config/passport')(passport);
require('./config/mongoose')(config);
require('./config/express')(app, config, passport);
require('./config/routes')(app, passport);

app.listen(config.port, config.ip, function () {
    console.log('====================== Configuration =========================');
    console.log('Environment: ', env);
    console.log('Port: ', config.port);
    console.log('IP: ', config.ip);
    console.log('Database connection string: ', config.db);
    console.log('==============================================================');
});

module.exports = app;