var express = require('express');
var router = express.Router();

module.exports = function (data) {
    var UsersController = require('./../../controllers/Users/UsersController')(data);

    router.route('/')
        .get(UsersController.getAll)
        .post(UsersController.create);

    router.route('/:id')
        .get(UsersController.getById)
        .put(UsersController.updateById)
        .delete(UsersController.remove);

    return router;
};