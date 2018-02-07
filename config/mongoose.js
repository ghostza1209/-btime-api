var mongoose = require('mongoose');
var uri = "mongodb://localhost/btime";

module.exports = function () {
    mongoose.connect(uri, '', function (error) {
        if (error) {
            return console.log(error)
        }
        console.log('connected database successfully.')
    })

    var db = mongoose.connection

    return db
}