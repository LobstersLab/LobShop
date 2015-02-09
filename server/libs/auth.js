/**
 * This module is used from PassportJS for the authentication operations and for the common
 * user checks (middlewares) like isAuthenticated or isAdministratior.
 * 
 * Can extend it for example with a method that checks if the current user is in certain role
 * or whatever you need used for the authentication module. 
 * 
 */

module.exports = function (passport) {
    function login (req, res, next) {
        passport.authenticate('local-login', function (error, user, info) {
            if (error) {
                return next(error);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                res.json({
                    user: user,
                    info: info
                });
            });

        })(req, res, next);
    }
    
    function signup (req, res, next) {
        passport.authenticate('local-signup', function (error, user, info) {
            if (error) {
                return next(error);
            }

            res.json({
                user: user,
                info: info,
            });
        })(req, res, next);
    }
    
    function logout (req, res) {
        req.logout();
        res.redirect('/Authentication');
    }

    // Route middleware to make sure a user is logged in
    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/Authentication');
        }
    }

    /**
     * OAuth callback
     */
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

    // TODO: Authorization middleware

    return {
        login: login,
        signup: signup,
        logout: logout,
        isAuthenticated: isLoggedIn,
        oauthCallback: oauthCallback
    };
};