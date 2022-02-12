const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    company : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    students : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'students'
    }],
    results : {
        type : Array
    }
},{
    timestamps : true
});

const interviews = mongoose.model('interviews',interviewSchema);
module.exports = interviews;