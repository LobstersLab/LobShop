'use strict';

var AuthenticationController = function (passport) {

    function login (req, res, next) {
        passport.authenticate('local-login', function (error, user, info) {
            if (error) {
                return next(error);
            }

            req.logIn(user, function (error) {
                if (error) {
                    return next(error);
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
                info: info
            });
        })(req, res, next);
    }

    function logout (req, res) {
        req.logout();
        res.redirect('/');
    }

    return {
        login: login,
        signup: signup,
        logout: logout
    }
};

module.exports = AuthenticationController;