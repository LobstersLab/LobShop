var paypal = require('paypal-rest-sdk'),
    Q = require('q'),
    config = require('../../../config/config');



var PayPalController = (function(){

    //Config the paypal
    paypal.configure(config.paypal);

    function makePayPalPayment (paymentInfo){
        var deferred = Q.defer();

        var payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3310/execute",
                "cancel_url": "http://localhost:3310/cancel"
            },
            "transactions": [{
                "amount": {
                    "total": paymentInfo.total,
                    "currency": paymentInfo.currency
                },
                "description": paymentInfo.description
            }]
        };

        paypal.payment.create(payment, function (error, payment) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            var redirectUrl;

            for(var i=0; i < payment.links.length; i++) {
                var link = payment.links[i];
                if (link.method === 'REDIRECT') {
                    redirectUrl = link.href;
                }
            }

            deferred.resolve({
                redirectUrl: redirectUrl,
                payment: payment
            });
        });

        return deferred.promise;
    }

    function makeCreditCardPayment (paymentInfo) {
        var deferred = Q.defer();

        var paymentInfo = {
            "intent": "sale",
            "payer": {
                "payment_method": "credit_card",
                "funding_instruments": [{
                    "credit_card": {
                        "number": paymentInfo.creditCardNumber,
                        "type": paymentInfo.creditCardType,
                        "expire_month": paymentInfo.creditCardExpireMonth,
                        "expire_year": paymentInfo.creditCardExpireYear,
                        "cvv2": paymentInfo.creditCardCCV,
                        "first_name": paymentInfo.creditCardFirstName,
                        "last_name": paymentInfo.creditCardLastName
                    }
                }]
            },
            "transactions": [{
                "amount": {
                    "total": paymentInfo.amountTotal,
                    "currency": paymentInfo.currency
                },
                "description": paymentInfo.description
            }]
        };

        paypal.payment.create(paymentInfo, function (error, payment) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(payment);
        });

        return deferred.promise;
    }

    function executePayPalPayment (req, res) {
        var paymentId = req.session.paymentId;
        var payerId = req.param('PayerID');
        var details = { "payer_id": payerId };

        paypal.payment.execute(paymentId, details, function (error, payment) {
            if (error) {
                res.render('error', {
                    error: error,
                    message: 'PayPal payment execution failed'
                });
            } else {
                res.json({
                    success: true,
                    message: "PayPal payment succeeded"
                });
            }
        });
    }

    function cancelPayPalPayment (req, res) {
        res.render('index', {
            message: 'PayPal payment cancelled'
        });
    }

    return {
        makeCreditCardPayment: makeCreditCardPayment,
        makePayPalPayment: makePayPalPayment,
        executePayPalPayment : executePayPalPayment,
        cancelPayPalPayment: cancelPayPalPayment
    };
})();


module.exports = PayPalController;
