
var Orders = function(data){

    function create (req, res){

        var validatedData = validateData(req);
        if(!data){
            return false;
        }

        data.orders.create(validatedData)
            .then(function (createdOrder){
                res.json({
                    success: true,
                    data: createdOrder
                });
            }, function (error){
                res.render('error', {
                    message: 'Cannot create order!',
                    error: error
                });
            })
    }

    function validateData (req){
        var data = req.body,
            user = req.user,
            validatedData = {};

        //Validate User
        if (user.ID) {
            validatedData.userId = user.ID;
        } else {
            return false;
        }

        //Validated order items
        if (data.items) {
            validatedData.items = data.items;
        } else {
            return false;
        }

        //Validate payment method
        if (data.paymentMethod) {
            validatedData.paymentMethod = data.paymentMethod;
        } else {
            return false;
        }

        //Validate delivery address
        if (data.deliveryAddress) {
            validatedData.deliveryAddress = data.deliveryAddress;
        } else {
            return false;
        }

        //Validate billing address
        if (data.billingAddress) {
            validatedData.billingAddress = data.billingAddress;
        } else {
            return false;
        }

        //Add comment if available
        if (data.comment) {
            validatedData.comment = data.comment;
        }
    }

    return {
        create: create
    };
};

module.exports = Orders;
