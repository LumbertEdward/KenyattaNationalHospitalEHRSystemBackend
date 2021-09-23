var express = require('express');
var router = express.Router();
const { RegisterStaff, EditStaffDetails, LoginStaff, DeleteStaffById, AllStaff, AddNotifications, GetNotifications, ActivateAccount, SuspendAccount, DeactivateAccount, AllPendingStaff, AllSuspendedStaff, AllActivatedStaff, GetStaffDetails } = require('../controllers/staffcontroller');
var urlencodedParser = express.urlencoded({ extended: false });

//authentication
router.get('/login', LoginStaff);
router.post('/register', urlencodedParser, RegisterStaff); //admin
router.get('/profile/edit', EditStaffDetails);
router.get('/delete', DeleteStaffById);
router.get('/all', AllStaff);
router.get('/details', GetStaffDetails);
//accounts
router.get('/activate', ActivateAccount);
router.get('/suspend', SuspendAccount);
router.get('/deactivate', DeactivateAccount);
router.get('/accounts/pending', AllPendingStaff);
router.get('/accounts/suspended', AllSuspendedStaff);
router.get('/accounts/activated', AllActivatedStaff);

//notifications
router.get('/addNotification', AddNotifications);
router.get('/viewNotifications', GetNotifications);

module.exports = router;