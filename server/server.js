// server.js

// modules =================================================
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
//session store
var MongoStore = require('connect-mongo')(session);

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.set('debug', true);
mongoose.connect(db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Advanced usage
var connection = mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");
});

require('./config/passport')(passport); // pass passport for configuration

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location
app.use(express.static(__dirname + '/../app/views'));
app.use(express.static(__dirname + '/../app/bower_components'));
app.use(express.static(__dirname + '/../app'));
app.set('views', __dirname + '/../app/views');

// required for passport
app.use(cookieParser());
app.use(session({
    secret: 'geantvert',
    store: new MongoStore({ mongooseConnection: connection }),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// routes ==================================================
require('./routes/routes.js')(app, passport); // configure our routes
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;
