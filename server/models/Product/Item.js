'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Brand = require('./Brand');
var Q = require('q');

var ProductItemSchema = new Schema({
    name: {
        type: String ,
        trim: true,
        default: '',
        required: 'Please fill in a product name'
    },
    lname: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: '',
        trim: true
    },
    description: [{
        language: {
            type: String,
            default: '',
            trim: true
        },
        value: {
            type: String,
            default: '',
            trim: true
        }
    }],
    count: {
        type: Number,
        default: 1,
        min: 0
    },
    brand: { type: Schema.Types.ObjectId, ref: 'ProductBrand' },
    assets: {
        images: [{
            title: {
                type: String,
                default: '',
                trim: true
            },
            height: { type: Number },
            width: { type: Number },
            src: {
                type: String,
                default: '',
                trim: true
            },
            thumbSrc: {
                type: String,
                default: '',
                trim: true
            }
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

//ProductItemSchema.methods.getPrice = function (callback) {
//    return this.model('ProductPrice').findById(this._id,callback);
//};

ProductItemSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('ProductItem', ProductItemSchema);