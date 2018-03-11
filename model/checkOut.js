var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')
var checkOutSchema = new Schema({
    checkOutTime: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    }

})
checkOutSchema.statics.createCheckout = (newCheckout, callback) => {
    newCheckout.save(function (err, checkOut, numAffected) {
        if (err) {
            return err
        } else {
            return callback(null, checkOut)
        }
    });
}



var checkOut = mongoose.model("checkOut", checkOutSchema)
module.exports = checkOut