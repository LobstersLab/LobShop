var Q = require('q');
var mongoose = require('mongoose');

var Product = require('./../../models/Product/Item');
var Price = require('./../../models/Product/Price');
var Summary = require('./../../models/Product/Summary');

function getAll () {
    var deferred = Q.defer();
    Summary
        .find({})
        //.populate('brand')
        .populate('price')
        .exec(function (error, products) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }
            deferred.resolve(products);
        });

    return deferred.promise;
}

function getById (id) {
    var deferred = Q.defer();

    Summary
        .findById(id)
        // .populate('brand')
        .populate('price')
        .exec(function (error, product) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(product);
        });

    return deferred.promise;
}

function create (params) {
    //Make the promise
    var deferred = Q.defer();
    var item;
    console.log(params);
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
    if(!params.name || !params.price){
        deferred.reject(new Error('Invalid input data! Name, price or description are missing!'));
        return deferred.promise;
    }

    item = new Product({
        name: params.name,
        lname: params.name.toLowerCase(),
        category: params.category,
        description: params.description,
        assets:{
            images: params.assets
        },
        attributes: params.attributes
    });



    item.save(function (error, savedItem) {
        if (error) {
            deferred.reject(error);
            return deferred.promise;
        }

        savePrice(savedItem, params)
        .then(function (savedPrice){
            return saveSummary(savedItem);
        }, function (error){
            deferred.reject(error);
            return deferred.promise;
        })

        .then(function (){
            deferred.resolve(savedItem);
        }, function (error){
            deferred.reject(error);
            return deferred.promise;
        });

    });

    return deferred.promise;
}

function updateProductById (params) {
    var deferred = Q.defer();
    var id = params.id;
    var updatesObject = params.updatesObject;

    //TODO more robust data validation is needed here
    //Data Validation and adjustments
    if(updatesObject.name){
        updatesObject.lname = updatesObject.name.toLowerCase();
    }

        Product.findByIdAndUpdate(id, updatesObject, function (error, updatedProduct){
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            updateSummaryById(id, updatesObject)
                .then(function (updatedSummary){
                    deferred.resolve(updatedSummary);
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

function savePrice (savedItem, params){
    var deferred = Q.defer();

    var price = new Price({
        //If a store is added concatenate it to the item id
        _id: savedItem._id,
        value: params.price
    });

    price.save(function (error){
        if (error) {
            deferred.reject(error);
            return deferred.promise;
        }

        deferred.resolve(price);
    });

    return deferred.promise;
}

function saveSummary (savedItem){

    var deferred = Q.defer();

    var summary = new Summary({
        _id: savedItem._id,
        name: savedItem.name,
        lname: savedItem.lname,
        category: savedItem.category,
        description: savedItem.description,
        images: savedItem.assets.images,
        attributes: savedItem.attributes,
        price: mongoose.Types.ObjectId(savedItem._id)
    });

    summary.save(function (error){
        if (error) {
            deferred.reject(error);
            return deferred.promise;
        }

        deferred.resolve(summary);
    });

    return deferred.promise;
}

function updateSummaryById (id, updateObject){

    var deferred = Q.defer();
        //TODO remove this heresy as soon as possible!!!!!
        delete updateObject.price;

        // TODO: updates on only one images will override all the images in the summary. Fix this
        updateObject.images = updateObject.assets;

        Summary.findByIdAndUpdate(id, updateObject , function (error, updatedSummary){
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(updatedSummary);
        });

    return deferred.promise;
}

module.exports = {
    name: 'products',
    data: {
        getAll: getAll,
        getById: getById,
        create: create,
        updateProductById: updateProductById,
        removeById: removeById,
        removeAll: removeAll
    }
};