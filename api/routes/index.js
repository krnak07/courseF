var express = require('express');
var router = express.Router();

var ctrlprofile = require('../controllers/profile.controllers.js');

router
    .route('/signup')
    .get(ctrlprofile.signup);

router
    .route('/login')
    .get(ctrlprofile.login);

router
    .route('/passreset')
    .get(ctrlprofile.passreset);


module.exports = router;
