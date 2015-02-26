'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'ProductItem'}],
    payment: {
        method: {
            type: String,
            default: '',
            trim: true
        },
        paypal : {type: Object},
        creditCard: {type: Object}
    },
    comment: {
        type: String,
        default: '',
        trim: true
    },
    subTotal: { type: Number },
    tax: { type: Number },
    deliveryAddress: [{
        country: {
            type: String,
            default: '',
            trim: true
        },
        city: {
            type: String,
            default: '',
            trim: true
        },
        street: {
            type: String,
            default: '',
            trim: true
        },
        zip: { type: Number }
    }],
    billingAddress: [{
        country: {
            type: String,
            default: '',
            trim: true
        },
        city: {
            type: String,
            default: '',
            trim: true
        },
        street: {
            type: String,
            default: '',
            trim: true
        },
        zip: { type: Number }
    }],
    status: {
        type: String,
        default: '',
        trim: true,
        enum: [
            'awaiting_payment',
            'paid',
            'delivered'
        ]
    }
});

module.exports = mongoose.model('Order', OrderSchema);

