var Q = require('q'),
    config = require('../../../config/config');

var Orders = function(data){

    var PayPalController = require('../PayPal/PayPalController')(data);

    function getAll (req, res) {
        data.orders.getAll()
            .then(function (orders) {
                res.json(orders);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get all orders!'
                });
            });
    }

    function getById (req, res) {
        var orderId = req.params.id;

        data.orders.getById(orderId)
            .then(function (order) {
                res.json(order);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get order by id!' + orderId
                });
            });
    }

    function updateById (req, res) {
        var orderId = req.params.id;
        var updatesObject = req.body;

        data.orders.updateById(orderId, updatesObject)
            .then(function (updatedOrder) {
                res.json(updatedOrder);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot update order by id!' + orderId
                });
            });
    }

    function removeById (req, res) {
        var orderId = req.params.id;

        data.orders.removeById(orderId)
            .then(function (removedOrder) {
                res.json(removedOrder);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot remove order by id!' + orderId
                });
            });
    }

    function validateData (req){
        var data = req.body,
            user = req.user,
            validatedData = {};

        //Set the order total price
        validatedData.total = data.total;

        //Validate Registered user User
        if (user) {
            validatedData.relatedRegisteredUserId = user.ID;
        }

        //Validate user info
        if(data.firstname && data.lastname && data.email && data.phoneNumber){
            validatedData.userInfo = {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
        }else{
            return {
                error:'Wrong User info!'
            };
        }

        //Validated order items
        if (data.items) {
            validatedData.items = data.items;
        } else {
            return {
                error:'No Items!'
            };
        }

        //Validate payment method and related info
        if (data.paymentMethod) {
            if(data.paymentMethod == 'credit-card'){
                //Validate billing address
                if (data.cardNumber && data.cardOwnerName && data.cardCvv &&
                    data.cardExpiresMonth && data.cardExpiresYear) {

                    var userNames = data.cardOwnerName.split(' ');

                    validatedData.paymentInfo = {
                        creditCardNumber: data.cardNumber,
                        creditCardType: data.cardType,
                        creditCardExpireMonth: data.cardExpiresMonth,
                        creditCardExpireYear: data.cardExpiresYear,
                        creditCardCCV: data.cardCvv,
                        creditCardFirstName: userNames[0],
                        creditCardLastName: userNames[1]
                    };
                } else {
                    return {
                        error:'No Credit Card info!'
                    };
                }
            }

            validatedData.paymentMethod = data.paymentMethod;
        } else {
            return {
                error:'No Payment Method!'
            };
        }

        //Validate delivery address
        if (data.country && data.city && data.address && data.postalCode) {
            validatedData.deliveryAddress = {
                country: data.country,
                city: data.city,
                address: data.address,
                zip: data.postalCode
            };

            validatedData.billingAddress = {
                country: data.country,
                city: data.city,
                address: data.address,
                zip: data.postalCode
            };
        } else {
            return {
                error:'Incorrect delivery info!'
            };
        }

        //Add comment if available
        if (data.comment) {
            validatedData.comment = data.comment;
        }

        //If no problems
        return validatedData;
    }

    function createOrder (req, res){
        var validatedData = validateData(req);
        //TODO save userId to order if logged in
        if(validatedData.error){
            res.json({
                success: false,
                message: validatedData.error
            });

            return;
        }

        //Adjust order status to awaiting payment
        validatedData.status = 'awaiting_payment';

        //Save order
        data.orders.createOrder(validatedData)
            .then(function (createdOrder) {
                //Process payment
                //Credit Card
                if (validatedData.paymentMethod == 'credit-card') {

                    payOrderWithCreditCard(validatedData, createdOrder)
                        .then(function (paymentData) {
                            //Update the order with the payment data on success
                            var paymentDataToUpdate = {
                                payment: {
                                    method: 'creditCard',
                                    paymentInfo: paymentData
                                },
                                status: 'paid'
                            };

                            updateOrderPayment(createdOrder._id, paymentDataToUpdate)
                                .then(function (updatedOrderWithPayment) {

                                    updateItemsCount(validatedData.items);

                                    res.json({
                                        success: true,
                                        message: 'Order payed with credit card and updated successfully!'
                                    });
                                }, function (error) {
                                    res.json({
                                        success: false,
                                        message: 'Updating order with payment failed, but payment with credit card was successful!',
                                        error:error
                                    });
                                });

                        }, function (error) {

                            res.json({
                                success: false,
                                message: 'Credit card payment for order failed!',
                                error:error
                            });
                        });

                }else if (validatedData.paymentMethod == 'paypal'){

                    payOrderWithPayPal(validatedData, createdOrder)
                        .then(function (paymentData) {
                            req.session.paymentId = paymentData.payment.id;
                            req.session.orderId = createdOrder._id;

                            updateItemsCount(validatedData.items);

                            res.json({
                                redirectUrl: paymentData.redirectUrl
                            });
                        }, function (error) {
                            // TODO: Handle errors correctly
                            res.json({
                                success: false,
                                message: 'PayPal payment for order failed!',
                                error: error
                            });
                        });
                }else if (validatedData.paymentMethod == 'cash'){
                    console.log(validatedData);
                    var paymentDataToUpdate = {
                        payment: {
                            method: 'cash',
                            paymentInfo: validatedData
                        },
                        status: 'cash_order'
                    };

                    updateOrderPayment(createdOrder._id, paymentDataToUpdate)
                        .then(function (updatedOrderWithPayment) {

                            updateItemsCount(validatedData.items);

                            res.json({
                                success: true,
                                message: 'Order created successfully!'
                            });
                        }, function (error) {
                            res.json({
                                success: false,
                                message: 'Updating order with payment failed!',
                                error:error
                            });
                        });

                }

            },
            //Error creating order
            function (error){
                res.json({
                    success: false,
                    message: 'Cannot create order!',
                    error:error
                });
            });
    }

    function updateItemsCount (items) {
        console.log('Items: ', items);

        items.forEach(function (itemId) {
            data.products.getById(itemId)
                .then(function (item) {
                    var currentCount = item.count;
                    var params = {
                        id: itemId,
                        updatesObject: {
                            count: currentCount - 1
                        }
                    };

                    data.products.updateProductById(params)
                        .then(function () {
                            // TODO: Do something if needed
                        }, function () {
                            console.log(error);
                            // TODO: Handle error
                        })
                }, function (error) {
                    console.log(error);
                    // TODO: Handle error
                });
        });
    }

    function payOrderWithCreditCard (orderFormData, orderData) {
        var deferred = Q.defer(),
            amountTotalFromOrder = orderFormData.total;

        getAmountTotalFromServer(orderData.items).then(function (amountTotalFromServer) {
            if(amountTotalFromServer != amountTotalFromOrder){
                deferred.reject(error);
                return;
            }
            //Create payment info object
            var paymentInfo = {
                creditCardNumber : orderFormData.paymentInfo.creditCardNumber,
                creditCardType: orderFormData.paymentInfo.creditCardType,
                creditCardExpireMonth: orderFormData.paymentInfo.creditCardExpireMonth,
                creditCardExpireYear: orderFormData.paymentInfo.creditCardExpireYear,
                creditCardCCV: orderFormData.paymentInfo.creditCardCCV,
                creditCardFirstName: orderFormData.paymentInfo.creditCardFirstName,
                creditCardLastName: orderFormData.paymentInfo.creditCardLastName,
                amountTotal: amountTotalFromServer,
                currency: 'USD',
                description: 'Payment for order ' + orderData._id
            };

            PayPalController.makeCreditCardPayment(paymentInfo)
                .then(function (data) {
                    //Payment is complete.
                    deferred.resolve(data);
                },
                //Error from creditCard payment
                function (error) {
                    deferred.reject(error);
                });
            
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function payOrderWithPayPal (orderFormData, orderData) {
        var deferred = Q.defer(),
            amountTotalFromOrder = orderFormData.total;

        getAmountTotalFromServer(orderData.items).then(function (amountTotalFromServer) {
            if(amountTotalFromServer != amountTotalFromOrder){
                deferred.reject(error);
                return;
            }

            var paymentInfo = {
                total: amountTotalFromOrder,
                currency: 'USD',
                description: 'Payment for order ' + orderData._id
            };

            PayPalController.makePayPalPayment(paymentInfo)
                .then(function (data) {
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function updateOrderPayment (orderId , paymentInfoData) {
        var deferred = Q.defer();

        data.orders.updateById(orderId , paymentInfoData)
            .then(function (updatedOrder) {
                deferred.resolve(updatedOrder);
            },
            //Error updating order with payment info
            function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function getAmountTotalFromServer (itemIds) {

        var deferred = Q.defer();

        data.prices.getById(itemIds).then(function (allPricesForOrder) {
            var amountTotalFromServer = 0,
                i = 0;
            while (allPricesForOrder.length > i){
                amountTotalFromServer += allPricesForOrder[i].value;
                i++;
            };
            deferred.resolve(amountTotalFromServer);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return {
        getAll: getAll,
        getById: getById,
        createOrder: createOrder,
        updateById: updateById,
        removeById: removeById
    };
};

module.exports = Orders;
