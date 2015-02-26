var paypal = require('paypal-rest-sdk'),
    Q = require('q'),
    config = require('../../../config/config');



var PayPalController = (function(){

    //Config the paypal
    paypal.configure(config.paypal);

    function createPayment (paymentInfo){
        var deferred = Q.defer();
        paymentInfo = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
                //"funding_instruments": [{
                //    "credit_card": {
                //        "number": "5500005555555559",
                //        "type": "mastercard",
                //        "expire_month": 12,
                //        "expire_year": 2018,
                //        "cvv2": 111,
                //        "first_name": "Joe",
                //        "last_name": "Shopper"
                //    }
                //}]
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
        console.log('gg',paymentInfo);
        paypal.payment.create(paymentInfo, function (error, payment) {
            console.log('ddd');
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(payment);
        });

        return deferred.promise;
    }

    function pay (params) {
        return createPayment(params.paymentInfo);
    }

    function executePayPalPayment () {
        return false;
    }

    function cancelPayPalPayment () {
        return false;
    }


    return {
        pay: pay,
        executePayPalPayment : executePayPalPayment,
        cancelPayPalPayment: cancelPayPalPayment
    };


})();


module.exports = PayPalController;
