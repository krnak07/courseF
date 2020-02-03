var express = require('express');
var router = express.Router();

var ctrlprofile = require('../controllers/profile.controllers.js');
var ctrlfaculty = require('../controllers/faculty.controllers.js');

router
    .route('/student/signup')
    .get(ctrlprofile.signup);

router
    .route('/student/login')
    .get(ctrlprofile.login);

router
    .route('/student/passreset')
    .get(ctrlprofile.passreset);

router
    .route('/faculty/signup')
    .get(ctrlfaculty.signup);

router
    .route('/faculty/login')
    .get(ctrlfaculty.login);



module.exports = router;
