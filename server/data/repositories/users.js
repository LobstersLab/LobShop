var Q = require('q');
var mongoose = require('mongoose');

var User = require('./../../models/User/User');

function getAll () {
    var deferred = Q.defer();

    User
        .find({}, function (error, users) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(users);
        });

    return deferred.promise;
}

function getById (id) {
    var deferred = Q.defer();

    User
        .findById(id, function (error, user) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(user);
        });

    return deferred.promise;
}

function create (params) {
    var deferred = Q.defer();
    var user = new User({
        // Set user model properties here...
    });

    user.save(function (error, savedUser) {
        if (error) {
            deferred.reject(error);
        }

        deferred.resolve(savedUser);
    });

    return deferred.promise;
}

function updateById (id, updatesObject) {
    //var deferred = Q.defer();

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
    name: 'users',
    data: {
        getAll: getAll,
        getById: getById,
        create: create,
        updateById: updateById,
        removeById: removeById,
        removeAll: removeAll
    }
};