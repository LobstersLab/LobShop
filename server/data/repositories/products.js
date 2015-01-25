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

    //Data Validation
    if(!params.name || !params.price || !params.description){
        deferred.reject(new Error('Invalid input data! Name, price or description are missing!'));
    }

    item = new Product({
        name: params.name,
        lname: params.name.toLowerCase(),
        category: params.categoryId,
        description: params.description,
        brand: mongoose.Types.ObjectId(params.brandId),
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

        .then(function (){
            return saveSummary(savedItem);
        }, function (error){
            deferred.reject(error);
        })

        .then(function (){
            deferred.resolve(savedItem);
        }, function (error){
            deferred.reject(error);
        });

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

    Product.findById(id, function (error, product){
        if(error){
            deferred.reject(error);
        }

        Object.keys(updatesObject).forEach(function (key) {
            product.set(key, updatesObject[key]);
        });

        product = product.toObject();

        Product.findByIdAndUpdate(id, { $set: product }, function (error, updatedProduct){
            if (error) {
                deferred.reject(error);
            }

            updateSummaryById(updatedProduct)
                .then(function (updatedSummary){

                });

            deferred.resolve(updatedProduct);
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
        price : params.price
    });

    price.save(function (error){
        if (error) {
            deferred.reject(error);
        }

        deferred.resolve(price);
    });

    return deferred.promise;
}

function saveSummary (savedItem){

    var deferred = Q.defer();

    var summary = new Summary({
        name: savedItem.name,
        lname: savedItem.lname,
        category: savedItem.categoryId,
        description: savedItem.description,
        brand: mongoose.Types.ObjectId(savedItem.brandId),
        assets:{
            images:savedItem.assets
        },
        attributes: savedItem.attributes
    });

    summary.save(function (error){
        if (error) {
            deferred.reject(error);
        }

        deferred.resolve(summary);
    });

    return deferred.promise;
}

function updateSummaryById (product){

    var deferred = Q.defer();

    Summary.findById(product.id, function (error, summary){
        if(error){
            deferred.reject(error);
        }

        Object.keys(product).forEach(function (key) {
            summary.set(key, product[key]);
        });

        summary = summary.toObject();

        Summary.findByIdAndUpdate(id, { $set: summary }, function (error, updatedSummary){
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(updatedSummary);
        });
    });
}

module.exports = {
    name: 'products',
    data: {
        getAll: getAll,
        getById: getById,
        create: create,
        updateById: updateProductById,
        removeById: removeById,
        removeAll: removeAll
    }
};