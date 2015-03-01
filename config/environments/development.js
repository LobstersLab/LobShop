var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3310;
//var mongoIp = mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/

module.exports = {
    rootPath: rootPath,
    port: port,
    ip: ip,
    db: 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/',
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