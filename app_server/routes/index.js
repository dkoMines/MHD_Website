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
router.get('/employees/:employeeID',ctrlEmployees.employeeHome);

/* Manager pages */
router.get('/managerInput', ctrlManagers.managerInput);
router.get('/managerRead', ctrlManagers.managerRead);
router.get('/managers/:managerID',ctrlManagers.managerHome);



module.exports = router;
