const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    college : {
        type : String,
        required : true
    },
    graduation_year : {
        type : String,
        required : true
    },
    mobile_no : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    dsa : {
        type : String,
        required : true
    },
    web_d : {
        type : String,
        required : true
    },
    react : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    interviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'interviews'
    }]
},{
    timestamps : true
});
const students = mongoose.model('students',studentSchema);
module.exports = students;