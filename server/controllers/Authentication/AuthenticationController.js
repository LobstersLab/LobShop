'use strict';

var User = require('./../../models/User/User');

var AuthenticationController = function (passport) {

    function login (req, res, next) {
        passport.authenticate('local-login', function (error, user, info) {
            if (error) {
                res.status(403).send(error);
                return;
            }

            req.logIn(user, function (error) {
                if (error) {
                    res.status(403).send(error);
                    return;
                }

                res.json({
                    user: getPublicUser(user),
                    info: info
                });
            });

        })(req, res, next);
    }

    function signup (req, res, next) {
        passport.authenticate('local-signup', function (error, user, info) {
            if (error) {
                res.status(403).send(error);
                return;
            }

            res.json({
                user: getPublicUser(user),
                info: info
            });
        })(req, res, next);
    }

    function logout (req, res) {
        req.logout();
        res.redirect('/');
    }

    // OAuth callback
    function oauthCallback (strategy) {
        return function(req, res, next) {
            passport.authenticate(strategy, function(err, user, redirectURL) {
                if (err || !user) {
                    return res.redirect('/auth/login');
                }
                req.login(user, function(err) {
                    if (err) {
                        return res.redirect('/auth/login');
                    }

                    return res.redirect(redirectURL || '/');
                });
            })(req, res, next);
        };
    }

    function saveOAuthUserProfile (req, providerUserProfile, done) {
        if (!req.user) {
            // Define a search query fields
            var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
            var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

            // Define main provider search query
            var mainProviderSearchQuery = {};
            mainProviderSearchQuery.provider = providerUserProfile.provider;
            mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

            // Define additional provider search query
            var additionalProviderSearchQuery = {};
            additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

            // Define a search query to find existing user with current provider profile
            var searchQuery = {
                $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
            };

            User.findOne(searchQuery, function(error, user) {
                if (error) {
                    return done(error);
                } else {
                    if (!user) {
                        var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

                        User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                            user = new User({
                                firstName: providerUserProfile.firstName,
                                lastName: providerUserProfile.lastName,
                                username: availableUsername,
                                displayName: providerUserProfile.displayName,
                                email: providerUserProfile.email,
                                provider: providerUserProfile.provider,
                                providerData: providerUserProfile.providerData
                            });

                            // And save the user
                            user.save(function(error) {
                                return done(error, user);
                            });
                        });
                    } else {
                        return done(error, user);
                    }
                }
            });
        } else {
            // User is already logged in, join the provider data to the existing user
            var user = req.user;

            // Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
            if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
                // Add the provider data to the additional provider data field
                if (!user.additionalProvidersData) user.additionalProvidersData = {};
                user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

                // Then tell mongoose that we've updated the additionalProvidersData field
                user.markModified('additionalProvidersData');

                // And save the user
                user.save(function(error) {
                    return done(error, user, '/#!/settings/accounts');
                });
            } else {
                return done(new Error('User is already connected using this provider'), user);
            }
        }
    }

    function removeOAuthProvider (req, res) {
        var user = req.user;
        var provider = req.param('provider');

        if (user && provider) {
            // Delete the additional provider
            if (user.additionalProvidersData[provider]) {
                delete user.additionalProvidersData[provider];

                // Then tell mongoose that we've updated the additionalProvidersData field
                user.markModified('additionalProvidersData');
            }

            user.save(function(error) {
                if (error) {
                    return res.status(400).send({
                        message: error
                    });
                } else {
                    req.login(user, function(error) {
                        if (error) {
                            res.status(400).send(error);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
        }
    }

    function getPublicUser (user) {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            roles: user.roles,
            country: user.country,
            city: user.city,
            postalCode: user.postalCode,
            address: user.address
        };
    }

    return {
        login: login,
        signup: signup,
        logout: logout,
        oauthCallback: oauthCallback,
        saveOAuthUserProfile: saveOAuthUserProfile,
        removeOAuthProvider: removeOAuthProvider
    }
};

module.exports = AuthenticationController;