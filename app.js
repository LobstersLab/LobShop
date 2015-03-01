var express = require('express');
var passport = require('passport');
var config = require('./config/config');

var app = express();

require('./config/passport')(passport);
require('./config/mongoose');
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

app.listen(config.port, config.ip, function () {
    console.log('====================== Configuration =========================');
    console.log('Environment: ', config.environment);
    console.log('Port: ', config.port);
    console.log('IP: ', config.ip);
    console.log('Database connection string: ', config.db);
    console.log('==============================================================');
});

module.exports = app;