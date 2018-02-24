var mongoose = require('mongoose')
var Schema = mongoose.Schema

var workPlaceSchema = new Schema({
    projectName: {
        type: String,
        trim: true
    },
    villaName: {
        type: String,
        trim: true
    },
    VillaNumber: {
        type: String,
        trim: true
    },
    district: {
        type: String,
        trim: true
    },
    pefecture: {
        type: String,
        trim: true
    },
    province: {
        type: String,
        trim: true
    },
    postcode: {
        type: String,
        trim: true
    },
    detail: {
        type: String,
        trim: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }

})

workPlaceSchema.static("createWorkplace", (newWorkplace, callback) => {
    newWorkplace.save((err) => {
        if (err) {
            return err
        } else {
            console.log("add workplace Success")
        }
    })
})

var workPlace = mongoose.model("workPlace", workPlaceSchema);
module.exports = workPlace