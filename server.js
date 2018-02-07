var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('./config/mongoose')
var userRoute = require('./route/user')

var db = mongoose()
var app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

//Route
userRoute(app)

app.listen(3000, function() {
    console.log('listening on 3000')
})