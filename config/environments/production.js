var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var ip = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT;
var dataDirRoot =  process.env.OPENSHIFT_DATA_DIR;
var connection_string = '';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

(function initStorageFolderStructure() {
    fs.readdir(dataDirRoot + '/products',function(error, files){
        if(error){
            console.log('Does not exist: ',dataDirRoot+ '/products');
            fs.mkdir(dataDirRoot + '/products',function(){
                console.log('Folder created', dataDirRoot + '/products');
                fs.readdir(dataDirRoot + '/products/images',function(error, files){
                    if(error){
                        console.log('Does not exist: ',dataDirRoot+ '/products/images');
                        fs.mkdir(dataDirRoot + '/products/images',function(){
                            console.log('Folder created', dataDirRoot + '/products/images');
                        });
                    }
                })
            });
        }
    });
})();

module.exports = {
    rootPath: rootPath,
    port: port,
    ip: ip,
    db: connection_string,
    baseUrl : 'http://' + ip + ':' + port,
    storageDir: dataDirRoot,
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