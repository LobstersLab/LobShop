var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    mongoose.connection
        .on('error', function () {
            console.log('Error occured with the db connection!');
        })
        .once('open', function () {
            console.log('DB connection opened!');
        });
}