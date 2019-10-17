const mongoose = require('mongoose');
const userDB = mongoose.model('users');

const showUsers = (req, res) => {
	userDB
		.find()
		.exec((err, users) => {
			if (!users) {
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
				.json(users);
		});
};
const index = (req, res) => {};

module.exports = {
	index,
	showUsers
};