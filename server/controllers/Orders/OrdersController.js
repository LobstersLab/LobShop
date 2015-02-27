var PayPalController = require('../PayPal/PayPalController'),
    Q = require('Q'),
    config = require('../../../config/config');

var Orders = function(data){

    function validateData (req){
        var data = req.body,
            user = req.user,
            validatedData = {};

        //Validate Registered user User
        if (user) {
            validatedData.relatedRegisteredUserId = user.ID;
        };

        //Validate user info
        if(data.firstname && data.lastname && data.email && data.phoneNumber){
            validatedData.userInfo = {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
        }else{
            return {error:'Wrong User info!'};
        }

        //Validated order items
        if (data.items) {
            validatedData.items = data.items;
        } else {
            return {error:'No Items!'};
        }

        //Validate payment method and related info
        if (data.paymentMethod) {
            if(data.paymentMethod == 'credit-card'){
                //Validate billing address
                if (data.cardNumber && data.cardOwnerName &&
                    data.cardCvv &&
                    data.cardExpiresMonth &&
                    data.cardExpiresYear
            ) {
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
                    return {error:'No Credit Card info!'};
                }
            }
            validatedData.paymentMethod = data.paymentMethod;
        } else {
            return {error:'No Payment Method!'};
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
            return {error:'Incorrect delivery info!'};;
        }

        //Add comment if available
        if (data.comment) {
            validatedData.comment = data.comment;
        }

        //If no problems
        return validatedData;
    };

    function createOrder (req, res){
        var validatedData = validateData(req);
        //TODO save userId to order if logged in
        if(validatedData.error){
            res.json({
                success: false,
                message: validatedData.error
            });
            return;
        };

        //Adjust order status to awaiting payment
        validatedData.status = 'awaiting_payment';

        //Save order
        data.orders.createOrder(validatedData)
            .then(function (createdOrder){
            //Process payment
                console.log('1');
                //Credit Card
                if(validatedData.paymentMethod == 'credit-card'){

                    payOrderWithCreditCard(validatedData.paymentInfo, createdOrder).then(function (paymentData) {
                        console.log('6');
                        //Update the order with the payment data on success
                        var paymentDataToUpdate = {
                            payment: {
                                method: 'creditCard',
                                creditCard : paymentData,
                                paypal: {}
                            },
                            status: 'paid'
                        };
                        updateOrderPayment(createdOrder._id, paymentDataToUpdate).then(function (updatedOrderWithPayment) {
                            console.log('8');
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
                            message: 'Payment for order failed!',
                            error:error
                        });

                    });

                }else if (validatedData.paymentMethod == 'paypal'){
                    //TODO call paypal payment here

                }

            },
            //Error creating order
            function (error){
                res.render('error', {
                    success: false,
                    message: 'Cannot create order!',
                    error: error
                });
            });
    };

    function payOrderWithCreditCard (orderFormData, orderData) {
        var deferred = Q.defer(),
            amountTotal = 10;
        //TODO Calculate total amount of items in order

        //Create payment info object
        var paymentInfo = {
            creditCardNumber : orderFormData.creditCardNumber,
            creditCardType: orderFormData.creditCardType,
            creditCardExpireMonth: orderFormData.creditCardExpireMonth,
            creditCardExpireYear: orderFormData.creditCardExpireYear,
            creditCardCCV: orderFormData.creditCardCCV,
            creditCardFirstName: orderFormData.creditCardFirstName,
            creditCardLastName: orderFormData.creditCardLastName,
            amountTotal: amountTotal,
            currency: 'USD',
            description: 'Payment for order' + orderData._id
        };
        console.log('2');
        PayPalController.makeCreditCardPayment(paymentInfo).then(function (data) {
                console.log('5');
                //Payment is complete.
                deferred.resolve(data);

            },
            //Error from creditCard payment
            function (error) {
                deferred.reject(error);
                return deferred.promise;
            });
        return deferred.promise;
    };

    function payOrderWithPayPal (paymentData) {
        var deferred = Q.defer();
        //Create payment info object
        var paymentInfo = {
            "intent": "sale",
            "payer": {
                "payment_method": 'paypal'
            },
            "redirect_urls": {
                "return_url": "http://localhost:3310/execute",
                "cancel_url": "http://localhost:3310/cancel"
            },
            "transactions": [{
                "amount": {
                    "total": "5.00",
                    "currency": "USD"
                },
                "description": "My awesome payment"
            }]
        };

        PayPalController.pay(paymentInfo).then(function (data) {
                //Payment is complete. Update order
                var paymentInfo = data;

                updateOrderPayment(paymentInfo).then(function (updatedOrder) {
                    deferred.resolve(updatedOrder);
                }, function (error) {
                    deferred.reject(error);
                    return deferred.promise;
                });

                return deferred.promise;
            },
            //Error from paypal payment
            function (error) {
                res.json({
                    error:error
                });
            });
    }

    function updateOrderPayment (orderId , paymentInfoData) {
        var deferred = Q.defer();
        console.log('8',data.orders);
        data.orders.updateById(orderId , paymentInfoData).then(function (updatedOrder) {
                console.log('9');
                deferred.resolve(updatedOrder);
            },
            //Error updating order with payment info
            function (error) {
                deferred.reject(error);
                return deferred.promise;
            });
        return deferred.promise;
    };

    return {
        createOrder: createOrder
    };
};

module.exports = Orders;
