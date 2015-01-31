'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductPriceSchema = new Schema({
    price: {
        type: Number,
        required: 'Price must be set'
    },
    sale: {
        salePrice: { type: Number },
        saleEndDate: { type: Date }
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ProductPrice', ProductPriceSchema);