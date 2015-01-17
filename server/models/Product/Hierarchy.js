'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductHierarchySchema = new Schema({
    name: { type: String },
    count: { type: Number },
    parents: [{ type: Schema.Types.ObjectId }],
    facets: [{ type: String }]
});

module.exports = mongoose.model('ProductHierarchy', ProductHierarchySchema);