var mongoose = require('mongoose');
if (process.env.NODE_ENV.trim() == "dev") {
    var uri = "mongodb://localhost/btime";
} else {
    var uri = "mongodb://yoss:yoss1209@ds247838.mlab.com:47838/btime";
}


module.exports = function() {
    mongoose.connect(uri, '', function(error) {
        if (error) {
            return console.log(error)
        }
        console.log('connected database successfully.')
    })

    var db = mongoose.connection

    return db
}