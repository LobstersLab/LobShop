var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    rootPath: rootPath,
    port: process.env.OPENSHIFT_NODEJS_PORT,
    ip: process.env.OPENSHIFT_NODEJS_PORT,
    db: '',
    session : {
        secret: 'openshift_secure_secrete',
        resave: true,
        saveUninitialized: true
    }
};