const interviews = require('../models/interviews');
const students = require('../models/students');

module.exports.create_interview = function(req, res) {
    interviews.findOne({company : req.body.company}, function(err, interview){
        if(err) {
            console.log(`Error querying the database : ${err}`);
            return;
        }
        //if interview does not already exits create one
        if(!interview || interview.date != req.body.date) {
            req.body.results = [];
            interviews.create(req.body, function(err, interview){
                if(err) {
                    console.log(`Error querying the database : ${err}`);
                    return;
                }
                else {
                    req.flash('success', 'Entry Successful');
                    return res.redirect('/users/interviews');
                }
            })
        }
        //if interview already exists show error message to user
        else {
            req.flash('error', 'Interview data already present');
            return res.redirect('back');
        }
    })
}
//Handle addition of students to interviews available
module.exports.student_to_interview = function(req, res) {
    interviews.findById(req.body.interviewId, async function(err, interview){
        if(err) {
            console.log(`Error querying the database : ${err}`);
            return;
        }
        if(interview) {
            let index = interview.students.indexOf(req.body.studentId);
            if(index == -1) {
                interview.students.push(req.body.studentId);
                interview.results.push(req.body.result);
                await interview.save();
                students.findById(req.body.studentId, async function(err,student){
                    if(err) {
                        console.log(`Error querying the database : ${err}`);
                        return;
                    }                   
                    if(student){
                        student.interviews.push(req.body.interviewId);
                        await student.save();
                    }
                })
                req.flash("success",'Student added');
                return res.redirect('/users/interviews');
            }  
            else {
                req.flash('error','Student already added');
                return res.redirect('back');
            }  
        }
        else {
            return res.redirect('users/interviews');
        }
    })
}
//Handle interview result update of individual student
module.exports.update_result = function(req, res) {
    let result = req.body.ajax_data.result;
    let studentId = req.body.ajax_data.studentId;
    let interviewId = req.body.ajax_data.interviewId;
    interviews.findById(interviewId, async function(err, interview){
        if(err) {
            console.log(`Error querying the database : ${err}`);
            return;
        } 
        if(interview){
            let index = interview.students.indexOf(studentId);
            if(index != -1){
                interview.results[index] = result;
                await interview.save();
            }
        }
    })
}