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



module.exports = router;
