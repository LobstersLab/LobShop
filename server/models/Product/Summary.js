'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSummarySchema = new Schema({
    name: {
        type: String ,
        trim: true,
        default: ''
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
    price: { type: Schema.Types.ObjectId, ref: 'ProductPrice' },
    department: { type: Schema.Types.ObjectId },
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
    img: [{
        height: { type: Number },
        width: { type: Number },
        title: {
            type: String,
            default: '',
            trim: true
        },
        src: {
            type: String,
            default: '',
            trim: true
        }
    }],
    attributes: [{
        name: { type: String },
        value: { type: String },
        family: { type: String }
    }],
    secondaryAttributes: [{
        name: { type: String },
        value: { type: String },
        family: { type: String }
    }],
    variants: [{
        id: { type: Schema.Types.ObjectId },
        img: [{
            height: { type: Number },
            width: { type: Number },
            title: { type: String },
            src: { type: String }
        }],
        attributes: [{ type: String }]
    }]
}, {
    transform: true
});

if (!ProductSummarySchema.options.toJSON) ProductSummarySchema.options.toJSON = {};

ProductSummarySchema.options.toJSON.transform = function (doc, ret, options) {
    if (!doc.ownerDocument && doc.attributes) {
        doc.attributes.forEach(function (attr) {
            ret[attr.name] = attr.value;
        });
    }
};

module.exports = mongoose.model('ProductSummary', ProductSummarySchema);