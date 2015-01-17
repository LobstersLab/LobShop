'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Brand = require('./Brand');

var ProductItemSchema = new Schema({
    name: { type: String },
    lname: { type: String },
    category: { type: String },
    description: [{
        language: { type: String },
        value: { type: String }
    }],
    brand: { type: Schema.Types.ObjectId, ref: 'ProductBrand' },
    assets: {
        images: [{
            height: { type: Number },
            width: { type: Number },
            src: { type: String }  
        }]
    },
    shipping: {
        dimensions: {
            height: { type: Number },
            length: { type: Number },
            width: { type: Number }
        },
        weight: { type: Number }
    },
    specs: [{
        name: { type: String },
        value: { type: String }
    }],
    attributes: [{
        name: { type: String },
        value: { type: String },
        family: { type: String }
    }],
    variants: {
        cnt: { type: Number },
        attributes: [{
            displayType: { type: String },
            name: { type: String }    
        }]
    }
    //lastUpdated: { type: Timestamp }
});

module.exports = mongoose.model('ProductItem', ProductItemSchema);