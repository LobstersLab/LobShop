﻿var express = require('express');
var router = express.Router();

module.exports = function (data) {
    var ProductsController = require('./../../controllers/Products/ProductsController')(data);

    router.route('/')
        .get(ProductsController.getAll)
        .post(ProductsController.create);
    
    router.route('/:id')
        .get(ProductsController.getById)
        .post(ProductsController.updateById)
        .delete(ProductsController.remove);
    
    return router;
};