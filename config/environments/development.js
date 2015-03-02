var path = require('path'),
    fs = require('fs'),
    q = require('q');

var rootPath = path.normalize(__dirname + '/../../');

var ip = '127.0.0.1';
var port = 3310;
var connection_string = 'mongodb://127.0.0.1:27017/LobShop';
var dataDirRoot = rootPath + 'public/storage/';

(function initStorageFolderStructure() {
    fs.readdir(dataDirRoot, function (error, files) {
        if (error) {
            fs.mkdir(dataDirRoot, function (error) {
                if (error) {
                    console.log('Error when creating storage folder!', error);
                    return;
                }
                fs.readdir(dataDirRoot + '/products', function(error, files){
                    if(error){
                        console.log('Does not exist: ', dataDirRoot+ '/products');

                        fs.mkdir(dataDirRoot + '/products', function(error){
                            if (error) {
                                console.log('Error when creating products folder: ', error);
                                return;
                            }
                            console.log('Folder created', dataDirRoot + '/products');

                            fs.readdir(dataDirRoot + '/products/images', function(error, files){
                                if(error){
                                    console.log('Does not exist: ', dataDirRoot+ '/products/images');

                                    fs.mkdir(dataDirRoot + '/products/images', function(error){
                                        if (error) {
                                            console.log('Error when creating images folder: ', error);
                                            return;
                                        }

                                        console.log('Folder created', dataDirRoot + '/products/images');
                                    });
                                }
                            })
                        });
                    }
                });
            });
        }
    });
})();

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