const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const passport = require('passport');


router.post('/create_interview', passport.checkAuthentication, interviewController.create_interview);
router.post('/student_to_interview', passport.checkAuthentication, interviewController.student_to_interview);
router.post('/update_result',passport.checkAuthentication, interviewController.update_result);

module.exports = router;