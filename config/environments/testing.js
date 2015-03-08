var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

var ip = '127.0.0.1';
var port = 3310;
var connection_string = 'mongodb://127.0.0.1:27017/LobShop_Testing';
var dataDirRoot = rootPath + 'public/storage/';

module.exports = {
    rootPath: rootPath,
    port: port,
    ip: ip,
    db: connection_string,
    storageDir: dataDirRoot,
    baseUrl : 'http://' + ip + ':' + port,
    session : {
        secret: 'chuck_noris',
        resave: true,
        saveUninitialized: true
    },
    paypal: {
        url: 'api.sandbox.paypal.com',
        port: '',
        client_id: 'AStKtxBIQiFyHhKdf_iTpwzL59TGtOtldvYd9ETpq5H7mAtvV0ORcLFlMFcHyLRl2ZRUqgOP0grizCsM',
        client_secret: 'EA9XvWraacAhUvlRFAoGSWgpGOQreMuAJb2PRfCSbFMfb5_KwTmhh0fKwp6uuD-HTegbAohsn7mqOpQK'
    }
};