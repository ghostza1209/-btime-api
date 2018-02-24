var userController = require('../controller/userController')
var passport = require('passport')
var local = require('../config/strategies/local')
var user = require('mongoose').model('user')
var workPlaceController = require('../controller/workPlaceController')
var attendController = require('../controller/attendController')

module.exports = function (app) {

    app.route('/user')
        .post(userController.register)
        .get(userController.getUser)
    app.route('/user/:id')
        .delete(userController.delUser)
        .get(userController.getById)
        .put(userController.editUser)
    app.post('/user/:username', (req, res) => {
        user.getUserByUsername(req.params.username, (err, user) => {
            if (err) {
                return err
            }
            if (!user) {
                return res.send("not found User!")
            }

            res.json({
                name: user.name,
                lastName: user.lastName
            })
        })
    })

    local() //เรียกใช้ LocalStrategy
    passport.serializeUser(function (user, done) { //เก็บ user.id เข้า Cookie
        done(null, user.id)
    })
    passport.deserializeUser(function (id, done) { // 
        user.findOne({
            _id: id
        }, function (err, user) {
            done(err, user)
        })
    })

    app.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            res.json({
                uname: req.user.username,
                id: req.user._id,
                type: req.user.type,
                auth: req.isAuthenticated()
            })
        });




    app.post('/addWorkplace', workPlaceController.addWorkplace)
    app.get('/workplace', workPlaceController.getAllWorkPlace)
    app.delete('/workplace/:id', workPlaceController.delWorkPlace)

    app.route('/attend')
        .post(attendController.addWorkTime)
        .get(attendController.getAllAttendInThisDay)

    app.route('/attend/:id')
        .put(attendController.updateAttendByid)
        .get(attendController.getAttendById)
}