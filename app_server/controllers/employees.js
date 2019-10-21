const request = require('request');
const apiOptions = {
	server: 'http://localhost:3000' // For development
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://polar-atoll-68892.herokuapp.com'; // Live URL
}

/* Get Employees page */
const employeeInput = (req, res) => {
	res.render('index', { title: 'Employee Input'});
};
const employeeRead = (req, res) => {
	res.render('index', { title: 'Employee Read'});
};

// ============================== Runs employeeHome ==================================


const renderEmployeeHome = (req, res,responseBody) => {
	let message = null;
	if (!(responseBody instanceof Array)) {
		message = 'API Lookup Error';
		responseBody = [];
	} else {
		if (!responseBody.length){
			message = 'User not found';
		}
	}
	body2 = getMentalHealthDays(req,res);
	res.render('employeeBase', {
		title: 'Mental Health Days Tracker (Management)',
		pageHeader: {
			title: 'HWI',
			strapline: 'Supply and track mental health days to your employees'
		},
		currentUser:responseBody[0],message,
		mhdFuture:body2
	});
};

const employeeHome = (req, res) => {
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
			renderEmployeeHome(req, res, data)
		}
	);
};

// ============================== Gets list of all users ==================================
var mhdList=[]; // Global var to help pass from request to return
function setMHDList(info){
	mhdList = info;
}

function getMentalHealthDays(req,res){
	const pathUsersList = '/api/employeeInput/'+req.params.employeeID;
	const requestMHDs = {
		url: apiOptions.server + pathUsersList,
		method: 'GET',
		json: {},
		qs: {}
	};
	request(
		requestMHDs,
		(err, {statusCode}, body) => {
			let data=[];
			if (statusCode === 200 && body.length){  // Catches errors if api didn't return the correct thing
				data = body;
			}
			setMHDList(data)
		}
	);
	return mhdList;
}

module.exports = {
	employeeInput,
	employeeRead,
	employeeHome
};