const mongoose = require('mongoose');
var ObjectId = require("mongoose").ObjectId;

const mhdUsed = new mongoose.Schema({
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
	dateUsed: {
		type:Date,
		required: true
	},
	comments: String
});

mongoose.model('mhdUsed',mhdUsed,'mhdUsed');
