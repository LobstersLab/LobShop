module.exports = function (data) {
    return {
        getAll: function (req, res) {
            data.users.getAll()
                .then(function (users) {
                    res.json({
                        products: users
                    });
                }, function (error) {
                    res.render('error', {
                        error: error,
                        message: 'Cannot get all users!'
                    });
                });
        },

        getById: function (req, res) {
            var id = req.params.id;

            data.users.getById(id)
                .then(function (user) {
                    res.json({
                        product: user
                    });
                }, function (error) {
                    res.render('error', {
                        error: error,
                        message: 'Cannot get user by id!'
                    });
                });
        },

        create: function (req, res) {
            data.users.create(req.body)
                .then(function (createdUser) {
                    res.json({
                        message: 'New user saved successfully!',
                        product: createdUser
                    });
                }, function (error) {
                    res.render('error', {
                        message: 'Cannot create user!',
                        error: error
                    });
                });
        },

        update: function (req, res) {

        },

        remove: function (req, res) {

        }
    }
};