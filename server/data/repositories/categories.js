var Q = require('q');
var mongoose = require('mongoose');
var Category = require('./../../models/Product/Category');

function getAll () {
    var deferred = Q.defer();

    Category
        .find({})
        .exec(function (error, categories) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(categories);
        });

    return deferred.promise;
}

function getById (id) {
    var deferred = Q.defer();

    Category
        .findById(id)
        .exec(function (error, category) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(category);
        });

    return deferred.promise;
}

function create (params) {
    var deferred = Q.defer();

    var category = new Category({
        name: params.name
        // parents: ...,
        // facets: ...
    });

    category.save(function (error, savedItem) {
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

    Category
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

    Category
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
    name: 'categories',
    data: {
        getAll: getAll,
        getById: getById,
        create: create,
        updateById: updateById,
        removeById: removeById,
        removeAll: removeAll
    }
};