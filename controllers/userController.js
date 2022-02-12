const employees = require('../models/employees');
const students = require('../models/students');
const interviews = require('../models/interviews');

module.exports.signIn = function(req, res) {
    //if user is already signed in redirect to dashboard
    if(req.isAuthenticated()) {
        return res.redirect('/users/dashboard');
    }
    return res.render('signIn', {
        title : "Sign In : Team Career Camp"
    });
}

module.exports.signUp = function(req, res) {
    //if user is already signed in redirect to dashboard
    if(req.isAuthenticated()) {
        return res.redirect('/users/dashboard');
    }
    return res.render('signUp', {
        title : "Sign Up : Team Career Camp"
    });
}
//Handle new user signup
module.exports.create = function(req, res) {
    if(req.body.confirm_password != req.body.password) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('back');
    }
    employees.findOne({email : req.body.email}, function(err, employee) {
        if(err) {
            console.log(`Error querying the database : ${err}`);
            return;
        }
        if(!employee) {
            employees.create(req.body, function(err, employee){
                if(err) {
                    console.log(`Error creating entry in the database : ${err}`);
                    return;
                }
                else {
                    req.flash('success', 'Sign Up Successful');
                    return res.redirect('/users/signIn');
                }
            })
        }
        else {
            req.flash('error', 'Email already exists! Try signing in or use another email');
            return res.redirect('back');
        }
    })    
}

module.exports.create_session = function(req, res) {
    return res.redirect('/users/dashboard');
}

module.exports.dashboard = function(req, res) {
    return res.render('dashboard', {
        title : 'Employee Page | Team Career Camp'
    })
}
//handle sign out
module.exports.destroySession = function(req, res) {
    req.logout();
    return res.redirect('/');
}
module.exports.students = function(req, res) {
    students.find({}).populate('interviews').exec(function(err, studentList) {
        if(err) {
            console.log(`Error creating entry in the database : ${err}`);
            return;
        }
        return res.render('students', {
            title : 'Employee Page | Team Career Camp',
            studentList : studentList
        })
    })
}

module.exports.interviews = function(req, res) {
    students.find({}, function(err, studentList){
        if(err) {
            console.log(`Error creating entry in the database : ${err}`);
            return;
        }
        interviews.find({}).populate('students').exec(function(err, interviewList){
            if(err) {
                console.log(`Error creating entry in the database : ${err}`);
                return;
            }
            return res.render('interviews',{
                title : 'Employee Page | Team Career Camp',
                interviewList : interviewList,
                studentList : studentList
            })
        })
    })
    
}

module.exports.jobs = function(req, res) {
    return res.render('jobs',{
        title : 'Jobs Page | Team Career Camp'
    })
}