var express = require('express');
const { LoginPatient, RegisterPatient, ViewPatients } = require('../controllers/patientcontroller');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false })

//authentication
router.post('/login', urlencodedParser, LoginPatient);
router.post('/register', urlencodedParser, RegisterPatient);

//viewPatients
router.get('/allpatients', ViewPatients);

module.exports = router;