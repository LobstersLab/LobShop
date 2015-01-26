/**
 * Created by twistedSynapse on 1/26/2015.
 */
var Q = require('q');
var mongoose = require('mongoose');

var Brand = require('./../../models/Product/Brand');

function getAll () {
    var deferred = Q.defer();

    Brand
        .find({})
        .exec(function (error, brands) {
            if (error) {
                return deferred.reject(error);
            }

            deferred.resolve(brands);
        });

    return deferred.promise;
}

function getById (id) {
    var deferred = Q.defer();

    Brand
        .findById(id)
        .exec(function (error, brands) {
            if (error) {
                return deferred.reject(error);
            }

            deferred.resolve(brands);
        });

    return deferred.promise;
}

function create (params) {
    //Make the promise
    var deferred = Q.defer();
    var item;
    // categoryHierarchy = '',
    // assets = [],
    // attributes = [],
    // i = 0;

    //if(product.attributes){
    //    i = 0;
    //    while(i < product.attributes.length){
    //        attributes.push(product.attributes[i]);
    //        i++;
    //    }
    //}
    //
    //
    //if(product.assets) {
    //    i = 0;
    //    while (i < product.assets.length) {
    //        assets.push(product.assets[i]);
    //        i++;
    //    }
    //}

    //Data Validation
    if(!params.name){
        return deferred.reject(new Error('Invalid input data! Name, price or description are missing!'));
    }

    item = new Brand({
        name: params.name,
        lname: params.name.toLowerCase(),
        image:{
            src: params.src,
            width: params.width,
            height:  params.height
        },
        attributes: params.attributes
    });



    item.save(function (error, savedItem) {
        if (error) {
            return deferred.reject(error);
        }
        deferred.resolve(savedItem);
    });

    return deferred.promise;
}

function updateProductById (params) {

    var deferred = Q.defer();
    var id = params.id;
    var updatesObject = params.updatesObject;

    //Data Validation and adjustments
    if(updatesObject.name){
        updatesObject.lname = updatesObject.name.toLowerCase();
    }

    Brand.findById(id, function (error, brand){
        if(error){
            return deferred.reject(error);
        }

        Object.keys(updatesObject).forEach(function (key) {
            brand.set(key, updatesObject[key]);
        });

        brand = brand.toObject();

        Brand.findByIdAndUpdate(id, { $set: brand }, function (error, updatedBrand){
            if (error) {
                return deferred.reject(error);
            }

            deferred.resolve(updatedBrand);
        });
    });

    return deferred.promise;
}

function removeById (id) {
    //var deferred = Q.defer();

    //return deferred.promise;
}

function removeAll () {
    //var deferred = Q.defer();

    //return deferred.promise;
}

module.exports = {
    name: 'brands',
    data: {
        getAll: getAll,
        getById: getById,
        create: create,
        updateById: updateProductById,
        removeById: removeById,
        removeAll: removeAll
    }
};