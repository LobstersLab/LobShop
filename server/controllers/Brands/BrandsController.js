var mongoose = require('mongoose');

var ProductBrand = require('./../../models/Product/Brand');

module.exports = function (data) {
    return {
        getAll: function (req, res) {
            ProductBrand
                .find({})
                .exec(function (error, brands) {
                res.json({
                    success: true,
                    brands: brands
                });
            });
        },
        getById: function (req, res) {
            var id = req.params.id;
            
            ProductBrand
                .findById(id)
                .exec(function (error, brand) {
                if (error) {
                    throw error;
                }
                
                res.json({
                    success: true,
                    brand: brand
                });
            });
        },
        create: function (req, res) {
            var item = new ProductBrand({
                name: req.body.name,
                image: req.body.image
            });
            
            item.save(function (error, savedItem) {
                if (error) {
                    throw error;
                }
                
                res.json({
                    message: 'New brand saved successfully!',
                    product: savedItem
                });
            });
        },
        update: function (req, res) {
            
        },
        remove: function (req, res) { 
        
        }
    }
};