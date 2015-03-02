var Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs'),
    //gm = require('gm'),
    uuid = require('node-uuid'),
    config = require('../../../config/config');

module.exports = function (data) {
    return {
        getAll: function (req, res) {
            data.products.getAll()
                .then(function (products) {
                    res.send(products);
                }, function (error) {
                    res.render('error', {
                        error: error,
                        message: 'Cannot get all products!'
                    });
                });
        },
        getById: function (req, res) {
            var id = req.params.id;

            data.products.getById(id)
                .then(function (product) {
                    res.send(product);
                }, function (error) {
                    res.render('error', {
                        error: error,
                        message: 'Cannot get product by id!'
                    });
                });
        },
        create: function (req, res) {
            //Data validation
            //Price is mandatory

            var busboy = new Busboy({ headers: req.headers }),
                productData = {
                    assets : []
                };

            busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

                var uuidFilename = uuid() + filename;
                var saveToPath = path.join(path.normalize(config.storageDir  + '/products/images/'), path.basename(uuidFilename));

                var productImageData = {
                    title: filename,
                    src: config.storageDir + '/products/images/' + uuidFilename,
                    thumbSrc: config.storageDir + '/products/images/thumb_' + uuidFilename
                    // TODO: get width and height and assign them here
                };

                var fileStream = fs.createWriteStream(saveToPath);

                productData.assets.push(productImageData);

                file.pipe(fileStream);

                //file.on('end', function() {
                //    var pathToNewImage = path.join(path.normalize(config.storageDir  + '/products/images/'), 'thumb_' + path.basename(uuidFilename));
                //    gm(saveToPath)
                //        .options({imageMagick: true})
                //        // TODO: Choose the correct image
                //        .resize(50, 50, '%')
                //        .write(pathToNewImage, function(error){
                //            if (error) {
                //                return console.log('Image thumb cannot be created! ', arguments);
                //            }
                //        })
                //});

            });

            busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
                if(fieldname == 'description' || fieldname == 'attributes') {
                    var value = JSON.parse(val);
                }else{
                    var value = val;
                }

                productData[fieldname] = value;
            });

            busboy.on('finish', function() {
                console.log('finish busboy create');
                data.products.create(productData)
                    .then(function (createdProduct) {
                        res.json({
                            message: 'New product saved successfully!',
                            product: createdProduct
                        });
                    }, function (error) {
                        res.json({
                            message: 'New product saved successfully!',
                            success: createdProduct
                        });
                    });
            });

            req.pipe(busboy);
        },
        updateById: function (req, res) {
            var busboy = new Busboy({ headers: req.headers }),
                productData = {
                    assets : []
                };
            busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

                var uuidFilename = uuid() + filename;
                var saveToPath = path.join(path.normalize(__dirname  + '/../../../public/storage/products/images/'), path.basename(uuidFilename));

                var productImageData = {
                    title: filename,
                    src: 'storage/products/images/' + uuidFilename
                };
                productData.assets.push(productImageData);
                file.pipe(fs.createWriteStream(saveToPath));
            });

            busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
                if(fieldname == 'description' || fieldname == 'attributes') {
                    var value = JSON.parse(val);
                }else{
                    var value = val;
                }

                productData[fieldname] = value;
            });

            busboy.on('finish', function() {
                data.products.updateProductById({id:req.params.id, updatesObject:productData})
                    .then(function (updatedProduct) {
                        res.json({
                            message: 'Product updated successfully!',
                            product: updatedProduct
                        });
                    },function (error) {
                        res.render('error', {
                            message: 'Cannot update product!',
                            error: error
                        });
                    });
            });

            req.pipe(busboy);
        },
        remove: function (req, res) { 
        
        }
    }
};