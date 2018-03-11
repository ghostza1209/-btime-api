var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')
var attendSchema = new Schema({
    attendTime: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        // type: String,
        type: Date,
        default: Date.now
    }

})

attendSchema.statics.checkIsAttend = (newAttend, callback) => {
    var startDay = moment().startOf('day').toISOString()
    var endDay = moment().endOf('day').add(7, 'h').toISOString()
    attend.find({
            date: {
                $gte: startDay,
                $lt: endDay
            },
            user: newAttend.user
        })
        .populate('user')
        .exec(callback)
}

attendSchema.statics.createAttend = (newAttend, callback) => {
    newAttend.save(function (err, attend, numAffected) {
        if (err) {
            return err
        } else {
            return callback(null, attend)
        }
    });
}



var attend = mongoose.model("attend", attendSchema)
module.exports = attend