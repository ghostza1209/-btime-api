var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rate: {
        type: Number
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
})

var user = mongoose.model("user", UserSchema);
module.exports = user