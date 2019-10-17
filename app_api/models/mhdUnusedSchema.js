const mongoose = require('mongoose');
var ObjectId = require("mongoose").ObjectId;
const mhdUnused = new mongoose.Schema({
	employeeID: {
		type:ObjectId,
		required: true
	},
	managerID: {
		type:ObjectId,
		required: true
	},
	dateAwarded: {
		type:Date,
		required: true
	},
	dateExpired: {
		type:Date,
		required: true
	},
	comments: {
		type:String,
		required: false
	}
});

mongoose.model('mhdUnused',mhdUnused,'mhdUnused');
