'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductBrandSchema = new Schema({
    name: {
        type: String,
        trim: true,
        default: '',
        unique: 'Brand name already exists',
        required: 'Please fill in a brand name'
    },
    lname: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        width: { type: Number },
        height: { type: Number },
        src: {
            type: String,
            default: '',
            trim: true
        }
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ProductBrand', ProductBrandSchema);