'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductVariantSchema = new Schema({
    name: {
        type: String ,
        trim: true,
        default: ''
    },
    lname: {
        type: String,
        default: ''
    },
    itemId: { type: Schema.Types.ObjectId },
    altIds: {
        upc: { type: String }
    },
    assets: {
        images: [{
            height: { type: Number },
            width: { type: Number },
            src: {
                type: String,
                default: '',
                trim: true
            }
        }]
    },
    attributes: [{
        name: { type: String },
        value: { type: String },
        family: { type: String }
    }]
});

module.exports = mongoose.model('ProductVariant', ProductVariantSchema);