const mongoose = require('mongoose');
const userDB = mongoose.model('users');
const mhdFutureDB = mongoose.model('mhdUnused');
const mhdPastDB = mongoose.model('mhdUsed');

// Used by .get method
const managerReadMHD = (req, res) => { 
	userDB
		.findById(req.params.userID)
		.exec((err, user) => {
			if (!user) {
				return res
					.status(404)
					.json({
						"message":"User not found"
					});
			} else if (err) {
				return res
				.status(404)
				.json(err);
			}
			mhdFutureDB
				.find({managerID:req.params.userID})
				.exec((err,days) => {
					if (!days) {
						return res
							.status(404)
							.json({
								"message":"No Days Found"
							});
					} else if (err) {
						return res
						.status(404)
						.json(err);
					}
					res
						.status(200)
						.json(days);
				});
		});
	// mhdPastDB
	// 	.find()
	// 	.exec((err,days) => {
	// 		if (!days) {
	// 			return res
	// 				.status(404)
	// 				.json({
	// 					"message":"No Days Found"
	// 				});
	// 		} else if (err) {
	// 			return res
	// 			.status(404)
	// 			.json(err);
	// 		}
	// 		res
	// 			.status(200)
	// 			.json(days);
	// 	});

};
const managerInput = (req, res) => { };
const managerRead = (req, res) => { };
const managerDeleteOne = (req, res) => {};

// Used by .post method
const createMHD = (req, res) => {
	var i,j;
	for (i=0;i<req.body.numDays;i++){
		for (j=0;j<req.body.employeeIDs.length;j++){
			mhdFutureDB.create({
				managerID: req.body.managerID,
				employeeID: req.body.employeeIDs[j],
				dateAwarded: new Date(),
				dateExpired: new Date(),
				comments: req.body.comments
			});
		}
	}
	res
		.status(201)
		.json()
};

const readUser = (req, res) => {
		userDB
		.findById(req.params.userID)
		.exec((err, user) => {
			if (!user) {
				return res
					.status(404)
					.json({
						"message":"User not found"
					});
			} else if (err) {
				return res
				.status(404)
				.json(err);
			}
			res
				.status(200)
				.json(user);
		});
};


module.exports = { 
	managerRead, 
	managerInput, 
	managerReadMHD,
	managerDeleteOne, 
	createMHD,
	readUser
};