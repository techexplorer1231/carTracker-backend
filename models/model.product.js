'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    name: {
		type : String,
		unique : true
	},
	description: {
		type : String,
		required : true
	}
});
module.exports = mongoose.model('Product', ProductSchema);
