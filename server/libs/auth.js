/**
 * This module is used from PassportJS for the authentication operations and for the common
 * user checks (middlewares) like isAuthenticated or isAdministratior.
 * 
 * Can extend it for example with a method that checks if the current user is in certain role
 * or whatever you need used for the authentication module. 
 * 
 */

module.exports = function (passport) {
    var login = function login (req, res, next) {
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
    };

    
    var signup = function signup (req, res, next) {
        passport.authenticate('local-signup', function (error, user, info) {
            if (error) {
                return next(error);
            }

            res.json({
                user: user,
                info: info,
            });
        })(req, res, next);
    };
    
    var logout = function logout (req, res) {
        req.logout();
        res.redirect('/Authentication');
    };

    // Route middleware to make sure a user is logged in
    var isLoggedIn = function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/Authentication');
        }
    }

    // TODO: Authorization middleware

    return {
        login: login,
        signup: signup,
        logout: logout,
        isAuthenticated: isLoggedIn
    };
};