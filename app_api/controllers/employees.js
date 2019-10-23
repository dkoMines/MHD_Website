const mongoose = require('mongoose');
const userDB = mongoose.model('users');
const mhdFutureDB = mongoose.model('mhdUnused');
const mhdPastDB = mongoose.model('mhdUsed');


const employeeRead = (req, res) => { };
const employeeInput = (req, res) => { };
const employeeReadOne = (req, res) => { };
const employeeDeleteOne = (req, res) => { };

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

const useMHD = (req,res,calDate)=>{
	mhdFutureDB // Select the MHD that was created first
	.find({employeeID:req.params.userID})
	.exec((err,mhds)=>{
		if (!mhds) {
			return res
				.status(404)
				.json({
					"message":"No MHDs Found"
				});
		} else if (err) {
			return res
				.status(404)
				.json(err);
		}
		var selectMHD = mhds[0];
		for (var i=0;i<mhds.length;i++){
			if (mhds[i].dateAwarded<selectMHD.dateAwarded){
				selectMHD = mhds[i];
			}
		}
		// Use select MHD to create used and delete old one
		mhdFutureDB
			.findByIdAndRemove(selectMHD._id) // Removes MHD
		    .exec((err, mhds) => {
	        if (err) {
	        	return res
	            	.status(404)
	            	.json(err);
	       	}
	       	mhdPastDB.create({ // Now adds new event to mhdPast
	       		// TODO::
	       		employeeID: selectMHD.employeeID,
	       		managerID: selectMHD.managerID,
	       		dateAwarded: selectMHD.dateAwarded,
	       		dateUsed: req.body.dateTaken,
	       		comments: ""
	       	});
	        res
				.status(201)
				.json();

		});
		
	});
};

const readFutureMHD = (req,res)=>{
	mhdFutureDB
	.find({employeeID:req.params.userID})
	.exec((err,mhds) =>{
		if (!mhds) {
			return res
				.status(404)
				.json({
					"message":"No MHDs Found"
				});
		} else if (err) {
			return res
			.status(404)
			.json(err);
		}
		res
			.status(200)
			.json(mhds);
	});
};

module.exports = {
	employeeInput,
	employeeRead,
	employeeReadOne,
	employeeDeleteOne,
	readUser,
	readFutureMHD,
	useMHD
};