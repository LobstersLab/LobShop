var CategoriesController = function (data) {

    function getAll (req, res) {
        data.categories.getAll()
            .then(function (categories) {
                res.json(categories);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get all categories!'
                });
            });
    }

    function getById(req, res) {
        var id = req.params.id;

        data.categories.getById(id)
            .then(function (category) {
                res.json(category);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get category by id' + id
                });
            });
    }

    function createCategory (req, res) {
        data.categories.create(req.body)
            .then(function (createdCategory) {
                res.json(createdCategory);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot create category!'
                });
            });
    }

    function updateById (req, res) {
        var categoryId = req.params.id;
        var updatesObject = req.body;

        data.categories.updateById(categoryId, updatesObject)
            .then(function (updatedProduct) {
                res.json(updatedProduct);
            },function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot update category with id ' + categoryId
                });
            });
    }

    function remove (req, res) {
        var categoryId = req.params.id;

        data.categories.remove(categoryId)
            .then(function (removedCategory) {
                res.json(removedCategory);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot remove category with id ' + categoryId
                });
            });
    }

    return {
        getAll: getAll,
        getById: getById,
        createCategory: createCategory,
        updateById: updateById,
        remove: remove
    }
};

module.exports = CategoriesController;