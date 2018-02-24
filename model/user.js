var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        // required: true,
    },
    lastName: {
        type: String,
        trim: true,
        // required: true
    },
    username: {
        type: String,
        trim: true,
        // required: "๊Username is required"
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        // required: 'Provider is required'
    },
    providerId: {
        type: String,
    },
    providerData: {},
    rate: {
        type: Number,
        trim: true,
        // required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    type: {
        type: Number,
        default: 0
    }
})

UserSchema.statics.getUserByUsername = (username, callback) => {
    user.findOne({username: username}, callback);
}

UserSchema.statics.getUserbyId = (id, callback) => {
    user.findById(id, callback);
}

UserSchema.statics.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) {
            return err;
        }
        callback(null, isMatch);
    });
}
UserSchema.statics.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.salt = hash;
            newUser.save(function (err) {
                if (err) {
                    return err
                } else {
                    console.log("Success")
                }
            });
        });
    });
}




var user = mongoose.model("user", UserSchema);
module.exports = user