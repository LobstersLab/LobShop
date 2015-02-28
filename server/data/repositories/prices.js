var Q = require('q');
var mongoose = require('mongoose');
var PriceModel = require('../../models/Product/Price');

function getAll () {
    var deferred = Q.defer();

    PriceModel
        .find({})
        .exec(function (error, prices) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(prices);
        });

    return deferred.promise;
}

function getById (ids) {
    var deferred = Q.defer();

    if(ids.constructor === Array){
        PriceModel.find({_id :{ $in: ids } }, function(error, prices){
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(prices);
        });

    }else{
        PriceModel.getById(ids)
            .exec(function (error, price) {
                if (error) {
                    deferred.reject(error);
                    return deferred.promise;
                }

                deferred.resolve(price);
            });

    }

    return deferred.promise;
}

function createPrice (params) {
    var deferred = Q.defer();


    //TODO adjust to have all mandatory parameters
    var Price = new PriceModel(params);

    Price.save(function (error, savedItem) {
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

    PriceModel
        .findByIdAndUpdate(id, updatesObject)
        .exec(function (error) {

            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve();
        });

    return deferred.promise;
}

function removeById (id) {
    var deferred = Q.defer();

    PriceModel
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
    name: 'prices',
    data: {
        getAll: getAll,
        getById: getById,
        createPrice: createPrice,
        updateById: updateById,
        removeById: removeById,
        removeAll: removeAll
    }
};