module.exports = function (data) {
    function getAll (req, res) {
        data.users.getAll()
            .then(function (users) {
                // TODO: return only the users public part
                res.json(users);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get all users!'
                });
            });
    }

    function getById (req, res) {
        var id = req.params.id;

        data.users.getById(id)
            .then(function (user) {
                res.json(getPublicUser(user));
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get user by id!'
                });
            });
    }

    function create (req, res) {
        data.users.create(req.body)
            .then(function (createdUser) {
                res.json(getPublicUser(createdUser));
            }, function (error) {
                res.render('error', {
                    message: 'Cannot create user!',
                    error: error
                });
            });
    }

    function updateById (req, res) {
        var id = req.params.id;
        var updatesObject = req.body;

        data.users.updateById(id, updatesObject)
            .then(function (updatedUser) {
                res.json(getPublicUser(updatedUser));
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot update user by id!'
                });
            });
    }

    function remove (req, res) {
        var id = req.params.id;

        data.users.removeById(id)
            .then(function (deletedUser) {
                res.json(getPublicUser(deletedUser));
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot delete user by id!'
                });
            });
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
        getAll: getAll,
        getById: getById,
        create: create,
        updateById: updateById,
        remove: remove
    }
};

