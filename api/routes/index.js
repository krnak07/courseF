var express = require('express');
var router = express.Router();

var ctrlprofile = require('../controllers/profile.controllers.js');
var ctrlfaculty = require('../controllers/faculty.controllers.js');
var ctrlcourse = require('../controllers/course.controller.js');
var ctrlfeedback = require('../controllers/feedback.controllers.js');
var ctrlemoticons = require('../controllers/emoticons.controllers.js');
var ctrldiscussionForums = require('../controllers/discussionforums.controllers.js');

router
    .route('/student/signup')
    .get(ctrlprofile.signup);

router
    .route('/student/login')
    .get(ctrlprofile.login);

router
    .route('/student')
    .get(ctrlprofile.profileGetall);

router
    .route('/student/passreset')
    .get(ctrlprofile.passreset);

router
    .route('/faculty/signup')
    .get(ctrlfaculty.signup);

router
    .route('/faculty/login')
    .get(ctrlfaculty.login);
router
    .route('/faculty')
    .get(ctrlfaculty.facultyGetall);
router
    .route('/dept')
    .get(ctrlcourse.addDept);
router
    .route('/course')
    .get(ctrlcourse.addCourse);
router
    .route('/getcourse')
    .get(ctrlcourse.getcourses);
router
    .route('/getcourseFac')
    .get(ctrlcourse.getcoursesFac);
router
    .route('/feedback')
    .get(ctrlfeedback.addOne);
router
    .route('/emoticons')
    .get(ctrlemoticons.addRating);
router
    .route('/checkrating')
    .get(ctrlemoticons.getRating);
router
    .route('/checkratingFac')
    .get(ctrlemoticons.getRatingFac);

router
    .route('/getfeedback')
    .get(ctrlfeedback.getFeedback);
router
    .route('/addquestion')
    .get(ctrldiscussionForums.addQuestion);
router
    .route('/getquestion')
    .get(ctrldiscussionForums.getQuestions);
router
    .route('/addanswer')
    .get(ctrldiscussionForums.addAnswers);
router
    .route('/getanswer')
    .get(ctrldiscussionForums.getAnswers);






module.exports = router;
