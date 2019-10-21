const request = require('request');
const apiOptions = {
	server: 'http://localhost:3000' // For development
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://polar-atoll-68892.herokuapp.com'; // Live URL
}


/* Get Managers page */
const managerInput = (req, res) => {
	res.render('managerInput', { 
		title: 'Manager Input',
		pageHeader: {
			title: 'HWI',
			strapline: 'Assign mental health days to your employees'
		}
	});

};

var dt = new Array("2/3/19","5/1/19","6/18/19");
var dtNil = new Array();

const managerRead = (req, res) => {
	res.render('managerRead', { 
		title: 'Manager Read',
		pageHeader: {
			title: 'HWI',
			strapline: 'View Employee Mental Health Day History'
		},
		employees: [{
			name: 'Dylan',
			daysLeft: '3',
			datesTaken: dt
		},
		{
			name: 'Chris',
			daysLeft: '5',
			datesTaken: dtNil
		},
		{
			name: 'Kyle',
			daysLeft: '1',
			datesTaken: dt
		}]
	});
};

const renderManagerHome = (req, res,responseBody) => {
	let message = null;
	if (!(responseBody instanceof Array)) {
		message = 'API Lookup Error';
		responseBody = [];
	} else {
		if (!responseBody.length){
			message = 'User not found';
		}
	}
	body2 = getUsersList();
	res.render('managerBase', {
		title: 'Mental Health Days Tracker (Management)',
		pageHeader: {
			title: 'HWI',
			strapline: 'Supply and track mental health days to your employees'
		},
		currentUser:responseBody[0],message,
		users:body2
	});
};



// ============================== Gets list of all users ==================================
var usersList=[]; // Global var to help pass from request to return
function setUsersList(info){
	usersList = info;
}

function getUsersList(){
	const pathUsersList = '/api/';
	const requestUsersList = {
		url: apiOptions.server + pathUsersList,
		method: 'GET',
		json: {},
		qs: {}
	};
	request(
		requestUsersList,
		(err, {statusCode}, body) => {
			let data=[];
			if (statusCode === 200 && body.length){  // Catches errors if api didn't return the correct thing
				data = body;
			}
			setUsersList(data)
		}
	);
	// console.log(usersList.length);
	return usersList;
}



// ============================== Runs managerHome ==================================
const managerHome = (req, res) => {
	const pathPageUser = '/api'+req.originalUrl;
	const requestUser = {
		url: apiOptions.server + pathPageUser,
		method: 'GET',
		json: {},
		qs: {}
	};
	request(
		requestUser,
		(err, {statusCode}, body) => {
			let data = [];
			if (statusCode === 200){  // Catches errors if api didn't return the correct thing
				data.push(body);
			}
			renderManagerHome(req, res, data)
		}
	);
};


module.exports = {
	managerInput,
	managerRead,
	managerHome
};