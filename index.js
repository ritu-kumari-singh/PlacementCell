const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const app = express();

//Set the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Add middleware that takes up the session cookie and encrypts it 
app.use(session({
    name : "placement_cell",
    secret : "something",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://localhost/team_career_camp',
        autoRemove : 'disabled'
    },
    function(err) {
        console.log(err || "connect-mongo db setup ok");
    })
}));

//Setting up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//handle incoming requests
app.use(cookieParser());

//Set up middleware to display flash messages
app.use(flash());
app.use(customMware.setFlash);

//Access static files
app.use(express.static('assets'));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//Set the routes
app.use('/',require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log('Error in running server', err);
        return;
    }
    console.log(`Server running on port : ${port}`);
})