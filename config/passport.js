var passport = require('passport')
var user = require('mongoose').model('user')

module.exports = function () {

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })
    passport.deserializeUser(function (id, done) {
        user.findOne({
            _id: id
        }, function (err, user) {
            done(err, user)
        })
    })

    //เรียกใช้ LocalStrategy
    require('./strategies/local')()

}