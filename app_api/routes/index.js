var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlEmployees = require('../controllers/employees');
var ctrlManagers = require('../controllers/managers');

// .get: reads something
	// use .find
// .post: creates something new
	// use .create
// .put: updates existing
	// Use .save for put
// .delete: Deletes
	// findByIdAndRemove()

router
	.route('/', ctrlMain.index)
	.get(ctrlMain.showUsers);

router
	.route('/managers/:userID')
	.get(ctrlManagers.readUser)
	.post(ctrlManagers.createMHD)

router
	.route('/employees/:userID')
	.get(ctrlEmployees.readUser)
	.post(ctrlEmployees.useMHD)



// Employees
router
	.route('/employeeInput')
	.get(ctrlEmployees.employeeRead)
	.post(ctrlEmployees.employeeInput);

router
	.route('/employeeInput/:userID')
	.get(ctrlEmployees.readFutureMHD)
	.post(ctrlEmployees.employeeInput)
	.delete(ctrlEmployees.employeeDeleteOne);

// Managers
router
	.route('/managerInput')
	.get(ctrlManagers.managerRead)
	.post(ctrlManagers.managerInput);

router
	.route('/managerInput/:userID')
	.get(ctrlManagers.managerReadMHD)
	.post(ctrlManagers.createMHD)
	.delete(ctrlManagers.managerDeleteOne);

module.exports = router;
