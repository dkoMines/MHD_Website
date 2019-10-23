var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main.js');
var ctrlEmployees = require('../controllers/employees');
var ctrlManagers = require('../controllers/managers');

/* Starter pages */
router.get('/', ctrlMain.index);

/* Employees pages */
router.get('/employeeInput', ctrlEmployees.employeeInput);
router.get('/employeeRead', ctrlEmployees.employeeRead);


/* Manager pages */
router.get('/managerInput', ctrlManagers.managerInput);
router.get('/managerRead', ctrlManagers.managerRead);
// managerHome
// router.get('/managers/:managerID',ctrlManagers.managerHome);
router
	.route('/managers/:managerID')
	.get(ctrlManagers.managerHome)
	.post(ctrlManagers.addMHD)

router
	.route('/employees/:employeeID')
	.get(ctrlEmployees.employeeHome)
	.post(ctrlEmployees.useMHD)



module.exports = router;
