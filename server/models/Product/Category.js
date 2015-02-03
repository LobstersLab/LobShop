'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductCategorySchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    count: {
        type: Number,
        default: 0
    },
    parents: [ Schema.Types.ObjectId ],
    facets: [{
        type: String,
        default: '',
        trim: true
    }]
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);