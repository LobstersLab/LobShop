'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductPriceSchema = new Schema({
    price: { type: Number },
    sale: {
        salePrice: { type: Number },
        saleEndDate: { type: Date }
    },
    lastUpdated: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ProductPrice', ProductPriceSchema);