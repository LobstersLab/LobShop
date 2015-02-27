var express = require('express');
var router = express.Router();

module.exports = function (data) {

    var OrdersController = require('./../../controllers/Orders/OrdersController')(data);
    var PayPalController = require('./../../controllers/PayPal/PayPalController');

    router.route('/')
        //.get(OrdersController.getAll)
        .post(OrdersController.createOrder);

    router.route('/execute')
        .get(PayPalController.executePayPalPayment);

    router.route('/cancel')
        .get(PayPalController.cancelPayPalPayment);

    //router.route('/:id')
    //    .get(OrdersController.getById)
    //    .put(OrdersController.updateById)
    //    .delete(OrdersController.remove);

    return router;
};