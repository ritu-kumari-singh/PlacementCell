const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/team_career_camp');
//Verify Connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to database"));
//Once connection is open for us
db.once('open', function() {
    console.log("Connection to Database Successful");
})