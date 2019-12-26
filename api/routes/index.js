var express = require('express');
var router = express.Router();

var ctrlprofile = require('../controllers/profile.controllers.js');

router
    .route('/signup')
    .post(ctrlprofile.signup);

router
    .route('/login')
    .post(ctrlprofile.login);

router
    .route('/passreset')
    .post(ctrlprofile.passreset);


module.exports = router;
