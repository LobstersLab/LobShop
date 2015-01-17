/**
 * This module includes the mongoose model and schema for the User business object.
 * The current configuration is only for the local strategy. If you want to use OAuth or other
 * types of authentication - extend it.
 * 
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String,
	fullname: String
});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);