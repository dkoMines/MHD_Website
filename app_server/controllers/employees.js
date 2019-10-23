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
		mhdFuture:body2,
		error:req.query.err,
		correct:req.query.cor
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


// Checks if the date is in the next (x) days
function checkDate(calDate){
	var x = 7; // Change for num of days in the future allowed
	var nowDate = new Date();
	nowDate.setHours(0);
	nowDate.setMinutes(0);
	nowDate.setSeconds(0);
	nowDate.setMilliseconds(0);
	if (calDate>=(nowDate-nowDate.getTimezoneOffset()*60000)){
		// Future
		if (calDate<=(nowDate-nowDate.getTimezoneOffset()*60000+1000*60*60*24*x)){
			// Within the next 7 days
			return true;
		}
		else {
			// Too far ahead in future
			return false;
		}
	} else {
		// Past
		return false;
	}
}

const useMHD = (req,res)=>{
	var year,month,day;
	year = req.body.calendar.slice(0,4);
	month = req.body.calendar.slice(5,7);
	day = req.body.calendar.slice(8,10);
	console.log(month+" "+day+" "+year);
	var calDate = new Date(req.body.calendar);
	if (checkDate(calDate)){
		// Make Request
		const path = '/api/employees/'+req.params.employeeID;
		const postdata = {
			dateTaken: calDate
		}
		const requestOptions = {
			url: apiOptions.server + path,
			method: 'POST',
			json: postdata,
		}
		request(
			requestOptions,
				(err, {statusCode}, employeeID) => {
				if (statusCode === 201) {
					res.redirect('/employees/'+req.params.employeeID);
				} else if (statusCode===400){
					res.redirect('/employees/'+req.params.employeeID+'?err=val');
				} else {
					console.log("Error. Please try again");
					res.redirect('/employees/'+req.params.employeeID+'?err=val');
				}
			}
		);
		res.redirect('/employees/'+req.params.employeeID+'?cor=val');
	} else {
		res.redirect('/employees/'+req.params.employeeID+'?err=val');
	}
};

module.exports = {
	employeeInput,
	employeeRead,
	employeeHome,
	useMHD
};