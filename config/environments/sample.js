var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    rootPath: rootPath,
    port: 3310,
    ip: '127.0.0.1',
    db: 'mongodb://127.0.0.1:27017/LobShop',
    session : {
        secret: 'chuck_noris',
        resave: true,
        saveUninitialized: true
    }
};