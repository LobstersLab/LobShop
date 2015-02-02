/**
 * Created by twistedSynapse on 2/2/2015.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{
        itemId: { type: Schema.Types.ObjectId, ref: 'Items'}
    }],
    paymentMethod: {
        type: String,
        default: '',
        trim: true
    },
    value: {
        type: String,
        default: '',
        trim: true
    },
    subTotal: { type: Number },
    tax: { type: Number },
    deliveryAddress: [{
        country: { type: Number },
        city: { type: Number },
        street: { type: Number },
        zip: { type: Number }
    }],
    billingAddress: [{
        country: { type: Number },
        city: { type: Number },
        street: { type: Number },
        zip: { type: Number }
    }]
});

module.exports = mongoose.model('Order', OrderSchema);

