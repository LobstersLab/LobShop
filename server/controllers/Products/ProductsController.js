module.exports = function (data) {
    return {
        getAll: function (req, res) {
            data.products.getAll()
                .then(function (products) {
                    res.json({
                        products: products
                    });
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
                    res.json({
                        product: product
                    });
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

            data.products.create(req.body)
                .then(function (createdProduct) {
                    res.json({
                        message: 'New product saved successfully!',
                        product: createdProduct
                    });
                }, function (error) {
                    res.render('error', {
                        message: 'Cannot create product!',
                        error: error
                    });
                });
        },
        updateProductById: function (req, res) {
            data.products.updateProductById(req.body)
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
            
        },
        remove: function (req, res) { 
        
        }
    }
};