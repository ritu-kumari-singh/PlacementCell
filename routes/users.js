const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/signIn', userController.signIn);
router.get('/signUp', userController.signUp);
router.get('/dashboard', passport.checkAuthentication, userController.dashboard);
router.get('/signOut', userController.destroySession);
router.get('/students', passport.checkAuthentication, userController.students);
router.get('/interviews', passport.checkAuthentication, userController.interviews);
router.get('/jobs',passport.checkAuthentication, userController.jobs);

router.post('/create', userController.create);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/signIn'},
),userController.create_session);
router.use('/students', require('./students'));
router.use('/interviews',require('./interviews'));
module.exports = router;