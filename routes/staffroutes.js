var express = require('express');
var router = express.Router();
const { RegisterStaff, EditStaffDetails, LoginStaff, DeleteStaffById, AllStaff, AddNotifications, GetNotifications, ActivateAccount, SuspendAccount, DeactivateAccount, AllPendingStaff, AllSuspendedStaff, AllActivatedStaff } = require('../controllers/staffcontroller');
var urlencodedParser = express.urlencoded({ extended: false });

//authentication
router.get('/login', LoginStaff);
router.post('/register', urlencodedParser, RegisterStaff); //admin
router.post('/profile/edit', urlencodedParser, EditStaffDetails);
router.get('/delete', DeleteStaffById);
router.get('/all', AllStaff);
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