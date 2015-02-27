'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./../../server/models/User/User');

module.exports = function () {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        var userData = req.body;
        console.log('Registering user: ', userData);

        process.nextTick(function () {
            User.findOne({'username': username}, function (error, user) {
                if (error) {
                    return done(error);
                }

                if (user) {
                    return done(null, false, { message: 'Username already exist!' });
                } else {

                    var newUser = new User({
                        username: username,
                        provider: 'local',
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        firstName: userData.firstname,
                        lastName: userData.lastname,
                        displayName: userData.firstname + ' ' + userData.lastname,
                        city: userData.city,
                        country: userData.country,
                        postalCode: userData.postalCode,
                        address: userData.address
                    });

                    newUser.password = newUser.generateHash(password);

                    if (userData.roles) {
                        newUser.roles = userData.roles;
                    }

                    newUser.save(function (error) {
                        if (error) {
                            throw error;
                        }

                        return done(null, newUser, { message: 'Sign up succeeded!' });
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        User.findOne({'username': username}, function (error, user) {
            if (error) {
                return done({message: error.message });
            }

            if (!user) {
                return done({ message: 'No user found!' });
            }

            if (!user.validPassword(password)) {
                return done({ message: 'Wrong password!' });
            }

            return done(false, user, { message: 'Login succeeded!' });
        });
    }));
};