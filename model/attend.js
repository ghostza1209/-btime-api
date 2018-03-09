var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')
var attendSchema = new Schema({
    attendTime: {
        type: String
    },
    offTime: {
        type: String
    },
    workPlace: {
        type: Schema.Types.ObjectId,
        ref: 'workPlace'
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
    var endDay = moment().endOf('day').add(7,'h').toISOString()
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
    newAttend.save(function (err) {
        if (err) {
            return err
        } else {
            console.log("Success")
        }
    });
}



var attend = mongoose.model("attend", attendSchema)
module.exports = attend