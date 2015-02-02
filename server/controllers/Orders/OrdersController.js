
var Orders = function(data){

    function create (req, res){

        var data = validateData(req.body);
        if(!data){
            return false;
        }

        data.orders.create(params)
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

    function validateData (){

        return false;
    }

    return {
        create: create
    };
};

module.exports = Orders;
