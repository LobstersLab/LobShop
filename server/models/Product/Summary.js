'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSummarySchema = new Schema({
    name: { type: String },
    lname: { type: String },
    category: { type: String },
    department: { type: Schema.Types.ObjectId },
    desc: [{
        language: { type: String },
        value: { type: String }
    }],
    img: [{
        height: { type: Number },
        width: { type: Number },
        title: { type: String },
        src: { type: String }
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
    //lastUpdated: { type: Timestamp }
});

module.exports = mongoose.model('ProductSummary', ProductSummarySchema);