const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const employees = require('../models/employees');
//Tell passport to use this strategy
passport.use(new localStrategy({
    usernameField : 'email'
},
function(email, password, done) {
    employees.findOne({email : email}, function(err, employee){
        if(err) {
            console.log(`Error finding entry in the database : ${err}`);
            return;
        }
        if(!employee || employee.password != password) {
            console.log('Invalid username or password');
            return done(null, false);
        }
        return done(null, employee);
    })
}));

//serialize user to decide which key is to be kept in the cookies
passport.serializeUser(function(employee, done){
    done(null, employee.id);
});

//deserializing user from key in the cookies
passport.deserializeUser(function(id, done){
    employees.findById(id, function(err, employee) {
        if(err) {
            console.log(`Error finding entry in the database : ${err}`);
            return;
        }
        return done(null, employee);
    })
})

passport.checkAuthentication = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.employee = req.user;
    }
    next();
}

module.exports = passport;