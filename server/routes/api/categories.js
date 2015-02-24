var express = require('express');
var router = express.Router();

module.exports = function (data) {
    var CategoriesController = require('./../../controllers/Products/CategoriesController')(data);

    router.route('/')
        .get(CategoriesController.getAll)
        .post(CategoriesController.create);

    router.route('/:id')
        .get(CategoriesController.getById)
        .put(CategoriesController.updateById)
        .delete(CategoriesController.remove);

    return router;
};