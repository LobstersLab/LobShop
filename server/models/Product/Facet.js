'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductFacetSchema = new Schema({
    // The _id must be a concatenation of name and value to lower case
    name: {
        type: String,
        default: '',
        trim: true
    },
    value: {
        type: String,
        default: '',
        trim: true
    },
    count: { type: Number }
});

module.exports = mongoose.model('ProductFacet', ProductFacetSchema);