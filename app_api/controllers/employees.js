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
	readFutureMHD
};