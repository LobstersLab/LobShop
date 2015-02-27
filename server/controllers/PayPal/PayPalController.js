var paypal = require('paypal-rest-sdk'),
    Q = require('q'),
    config = require('../../../config/config');



var PayPalController = (function(){

    //Config the paypal
    paypal.configure(config.paypal);

    function createPayment (paymentInfo){
        var deferred = Q.defer();

        paypal.payment.create(paymentInfo, function (error, payment) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(payment);
        });

        return deferred.promise;
    }

    function makeCreditCardPayment (paymentInfo) {
        console.log('3',paymentInfo);
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
            console.log('4', error);
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(payment);
        });

        return deferred.promise;
    }

    function executePayPalPayment () {
        return false;
    }

    function cancelPayPalPayment () {
        return false;
    }


    return {
        makeCreditCardPayment: makeCreditCardPayment,
        executePayPalPayment : executePayPalPayment,
        cancelPayPalPayment: cancelPayPalPayment
    };


})();


module.exports = PayPalController;
