const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const passport = require('passport');


router.post('/create_student', passport.checkAuthentication, studentController.create_student);
router.post('/download_csv', passport.checkAuthentication, studentController.download_csv);
router.post('/download_all_data', passport.checkAuthentication, studentController.download_all_data);

module.exports = router;
