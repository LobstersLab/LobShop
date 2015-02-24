var express = require('express');
var router = express.Router();

module.exports = function (data) {
    var BrandsController = require('./../../controllers/Brands/BrandsController')(data);
    
    router.route('/')
        .get(BrandsController.getAll)
        .post(BrandsController.create);
    
    router.route('/:id')
        .get(BrandsController.getById)
        .put(BrandsController.update)
        .delete(BrandsController.remove);
    
    return router;
};