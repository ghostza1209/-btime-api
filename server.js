var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('./config/mongoose')
var userRoute = require('./route/user')
var session = require('express-session')
var passport = require('passport')
var cookieParser = require('cookie-parser')
var expressValidator = require('express-validator');


var db = mongoose()
var app = express()


//cors
app.use(cors())

//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
//Cokie Parser
app.use(cookieParser())

//express-session 
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}))


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
 

//Route
userRoute(app)

app.listen(3000, function () {
    console.log('listening on 3000')
})