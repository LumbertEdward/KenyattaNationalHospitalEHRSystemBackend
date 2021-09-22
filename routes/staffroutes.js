var express = require('express');
var router = express.Router();
const { RegisterStaff, EditStaffDetails, LoginStaff, DeleteStaffById, AllStaff, AddNotifications, GetNotifications, ActivateAccount, SuspendAccount, DeactivateAccount } = require('../controllers/staffcontroller');
var urlencodedParser = express.urlencoded({ extended: false });

//authentication
router.get('/login', LoginStaff);
router.post('/register', urlencodedParser, RegisterStaff); //admin
router.post('/profile/edit', urlencodedParser, EditStaffDetails);
router.get('/delete', DeleteStaffById);
router.get('/all', AllStaff);
router.get('/activate', ActivateAccount);
router.get('/suspend', SuspendAccount);
router.get('/deactivate', DeactivateAccount);

//notifications
router.get('/addNotification', AddNotifications);
router.get('/viewNotifications', GetNotifications);

module.exports = router;