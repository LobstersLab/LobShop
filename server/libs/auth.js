/**
 * This module is used from PassportJS for the authentication operations and for the common
 * user checks (middlewares) like isAuthenticated or isAdministratior.
 * 
 * Can extend it for example with a method that checks if the current user is in certain role
 * or whatever you need used for the authentication module. 
 * 
 */

'use strict';

module.exports = function (passport) {
    // TODO: Authorization and authentication middlewares here (isInRole, isAdmin...)

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }

    // OAuth callback
    function oauthCallback (strategy) {
        return function(req, res, next) {
            passport.authenticate(strategy, function(err, user, redirectURL) {
                if (err || !user) {
                    return res.redirect('/#!/signin');
                }
                req.login(user, function(err) {
                    if (err) {
                        return res.redirect('/#!/signin');
                    }

                    return res.redirect(redirectURL || '/');
                });
            })(req, res, next);
        };
    }

    return {
        isAuthenticated: isLoggedIn,
        oauthCallback: oauthCallback
    };
};