var express = require('express');
var router = express.Router();
const { Login } = require('../controllers/staffcontroller');
var urlencodedParser = express.urlencoded({ extended: false });

//authentication
router.get('/login', Login);

module.exports = router;