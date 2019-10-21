const request = require('request');
const apiOptions = {
	server: 'http://localhost:3000' // For development
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://polar-atoll-68892.herokuapp.com'; // Live URL
}

// Used to render the homepage
const renderIndex = (req, res, responseBody1) => {
	let message = null;
	if (!(responseBody1 instanceof Array)) {
		message = 'API Lookup Error';
		responseBody1 = [];
	} else {
		if (!responseBody1.length){
			message = 'No users found';
		}
	}
	res.render('index', { 
		title: 'Mental Health Day Tracker',
		users: responseBody1, message
	});

}

/* Passes request data from GET into our homepage */
const index = (req, res) => {
	const path = '/api/';
	const requestUserList = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {},
		qs: {}
	};
	request(
		requestUserList,
		(err, {statusCode}, body) => {
			let data = [];
			if (statusCode === 200 && body.length){  // Catches errors if api didn't return the correct thing
				data = body;
			}
			renderIndex(req, res, data);
		}
	);
};


module.exports = {
	index
};