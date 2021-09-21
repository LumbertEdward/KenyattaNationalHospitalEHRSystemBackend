var express = require('express');
var router = express.Router();
const { RegisterStaff, EditStaffDetails, LoginStaff, DeleteStaffById, AllStaff, AddNotifications, GetNotifications, ActivateAccount } = require('../controllers/staffcontroller');
var urlencodedParser = express.urlencoded({ extended: false });

//authentication
router.get('/login', LoginStaff);
router.post('/register', urlencodedParser, RegisterStaff); //admin
router.post('/profile/edit', urlencodedParser, EditStaffDetails);
router.get('/delete', DeleteStaffById);
router.get('/all', AllStaff);
router.get('/:staff_id/activate', ActivateAccount);

//notifications
router.get('/addNotification', AddNotifications);
router.get('/viewNotifications', GetNotifications);

module.exports = router;