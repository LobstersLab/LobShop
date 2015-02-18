var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var express = require('express');
var router = express.Router();

module.exports = function (data) {
    var ProductsController = require('./../../../controllers/Products/ProductsController')(data);

    router.route('/')
        .get(ProductsController.getAll)
        .post(multipartyMiddleware, ProductsController.create);
    
    router.route('/:id')
        .get(ProductsController.getById)
        .put(multipartyMiddleware, ProductsController.updateProductById)
        .delete(ProductsController.remove);
    
    return router;
};