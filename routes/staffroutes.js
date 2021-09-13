var express = require('express');
var router = express.Router();
const { RegisterStaff, EditStaffDetails, LoginStaff, DeleteStaffById } = require('../controllers/staffcontroller');
var urlencodedParser = express.urlencoded({ extended: false });

//authentication
router.get('/login', LoginStaff);
router.post('/register', urlencodedParser, RegisterStaff);
router.post('/profile/edit', urlencodedParser, EditStaffDetails);
router.get('/staff/delete', DeleteStaffById);

module.exports = router;