const request = require('request');
const apiOptions = {
	server: 'http://localhost:3000' // For development
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://polar-atoll-68892.herokuapp.com'; // Live URL
}

// Used to render the homepage
const renderIndex = (req, res, responseBody) => {
	let message = null;
	if (!(responseBody instanceof Array)) {
		message = 'API Lookup Error';
		responseBody = [];
	} else {
		if (!responseBody.length){
			message = 'No users found';
		}
	}
	res.render('index', { 
		title: 'Mental Health Day Tracker',
		users: responseBody, message
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
	console.log(requestUserList.url);
	request(
		requestUserList,
		(err, {statusCode}, body) => {
			let data = [];
			if (statusCode === 200 && body.length){
				data = body;
			}
			renderIndex(req, res, data);
		}
	);
};


module.exports = {
	index
};