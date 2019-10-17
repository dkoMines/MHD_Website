const request = require('request');
/* Get Employees page */
const employeeInput = (req, res) => {
	res.render('index', { title: 'Employee Input'});
};
const employeeRead = (req, res) => {
	res.render('index', { title: 'Employee Read'});
};
module.exports = {
	employeeInput,
	employeeRead
};