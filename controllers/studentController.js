const students = require('../models/students');

//if student does not already exist create new entry
module.exports.create_student = function(req, res) {
    students.findOne({email : req.body.email}, function(err, student) {
         if(err) {
             console.log(`Error querying the database : ${err}`);
             return;
         }
         if(!student) {
             req.body.interviews = [];
             students.create(req.body, function(err, student){
                 if(err) {
                     console.log(`Error creating entry in the database : ${err}`);
                     return;
                }
                 else {
                     req.flash('success', 'Entry Successful');
                     return res.redirect('/users/students');
                 }
             })
         }
         else {
             req.flash('error', 'Student data already present');
             return res.redirect('back');
         }
     })    
}
//Send individual student data for csv report
module.exports.download_csv = function(req, res) {
    let id = req.body.ajax_data.id;
    students.findById(id).populate('interviews').exec(function(err, student){
        res.json([{
            data : student
        }]);
    })    
}
//Send all students data for csv report
module.exports.download_all_data = function(req, res) {
    students.find({}).populate('interviews').exec(function(err, student){
        res.json([{
            data : student
        }]);
    })    
}