var Q = require('q');
var mongoose = require('mongoose');

var Product = require('./../../models/Product/Item');
var Price = require('./../../models/Product/Price');
var Summary = require('./../../models/Product/Summary');

function getAll () {
    var deferred = Q.defer();

    Product
        .find({})
        .populate('brand')
        .exec(function (error, products) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(products);
        });

    return deferred.promise;
}

function getById (id) {
    var deferred = Q.defer();

    Product
        .findById(id)
        .populate('brand')
        .exec(function (error, product) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(product);
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

    item = new Product({
        name: params.name,
        lname: params.name.toLowerCase(),
        category: params.categoryId,
        description: params.description,
        brand: mongoose.Types.ObjectId(params.brandId),
        assets:{
            images:params.assets
        },
        attributes: params.attributes
    });



    item.save(function (error, savedItem) {
        if (error) {
            deferred.reject(error);
        }
        var price = new Price({
            //If a store is added concatenate it to the item id
            _id: savedItem._id,
            price : params.price
        });

        price.save(function (error){
            if (error) {
                deferred.reject(error);
            }
        });

        var summary = new Summary({


        });
        deferred.resolve(savedItem);

    });

    return deferred.promise;
}

function updateById (id, updatesObject) {
    //var deferred = Q.defer();

    //CharterParty.findById(id, function (error, cpForm){
    //    if(error){
    //        deferred.reject(error);
    //    }
    //    cpForm.terms = [];
    //    updatesObject.terms.forEach(function(item,index){
    //        cpForm.terms.set(index,item);
    //    });

    //    cpForm = cpForm.toObject();
    //    CharterParty.findByIdAndUpdate(id, { $set: cpForm },function (error, updatedCPForm){
    //        if (error) {
    //            deferred.reject(error);
    //        }
    //        deferred.resolve(updatedCPForm);
    //    });
    //});

    //return deferred.promise;
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
    name: 'products',
    data: {
        getAll: getAll,
        getById: getById,
        create: create,
        updateById: updateById,
        removeById: removeById,
        removeAll: removeAll
    }
};