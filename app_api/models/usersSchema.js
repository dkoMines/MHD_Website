const mongoose = require('mongoose');

const user = new mongoose.Schema({
	firstName: {
		type:String,
		required: true
	},
	lastName: {
		type:String,
		required: true
	},
	manager: {
		type:Boolean,
		required: true,
		default: false
	}
});


mongoose.model('users',user,'users');
