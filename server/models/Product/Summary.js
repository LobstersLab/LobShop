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
});

module.exports = mongoose.model('ProductSummary', ProductSummarySchema);