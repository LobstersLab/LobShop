var Q = require('q');
var mongoose = require('mongoose');
var Order = require('./../../models/Orders/Order');

function getAll () {
    var deferred = Q.defer();

    Order
        .find({})
        .exec(function (error, orders) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(orders);
        });

    return deferred.promise;
}

function getById (id) {
    var deferred = Q.defer();

    Order
        .getById(id)
        .exec(function (error, Order) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(Order);
        });

    return deferred.promise;
}

function createOrder (params) {
    var deferred = Q.defer();


    //TODO adjust to have all mandatory parameters
    var Order = new Order({
        name: params.name
        // parents: ...,
        // facets: ...
    });

    Order.save(function (error, savedItem) {
        if (error) {
            deferred.reject(error);
            return deferred.promise;
        }

        deferred.resolve(savedItem);
    });

    return deferred.promise;
}

function updateById (id, updatesObject) {
    var deferred = Q.defer();

    Order
        .findByIdAndUpdate(id, updatesObject)
        .exec(function (error) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            // TODO: Check what is returned from the findByIdAndUpdate() method
            deferred.resolve();
        });

    return deferred.promise;
}

function removeById (id) {
    var deferred = Q.defer();

    Order
        .findByIdAndRemove(id)
        .exec(function (error) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            // TODO: Check what is returned from the findByIdAndRemove() method
            deferred.resolve();
        });

    return deferred.promise;
}

function removeAll () {
    var deferred = Q.defer();

    return deferred.promise;
}

module.exports = {
    name: 'orders',
    data: {
        getAll: getAll,
        getById: getById,
        createOrder: createOrder,
        updateById: updateById,
        removeById: removeById,
        removeAll: removeAll
    }
};