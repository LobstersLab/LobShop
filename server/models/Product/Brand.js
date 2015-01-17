'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductBrandSchema = new Schema({
    name: { type: String },
    image: {
        src: { type: String },
        width: { type: Number },
        height: { type: Number }
    }
});

module.exports = mongoose.model('ProductBrand', ProductBrandSchema);