var workPlace = require('../model/workPlace')


exports.addWorkplace = (req, res, next) => {
    req.checkBody("projectName", "project name is required").notEmpty();
    req.checkBody("villaName", "villa name is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send(errors)
    } else {
        let newWorkPlace = new workPlace({
            projectName: req.body.projectName,
            villaName: req.body.villaName,
            VillaNumber: req.body.villaNumber,
            district: req.body.tumbhon,
            pefecture: req.body.amphur,
            province: req.body.province,
            postcode: req.body.postCode,
            detail: req.body.detail
        })

         workPlace.findOne({
            projectName: req.body.projectName,
            villaName: req.body.villaName,
            VillaNumber: req.body.villaNumber
        }).exec((err, data) => {
            if (!data) {
                res.send("1") // doesn't have
                workPlace.createWorkplace(newWorkPlace, err => {
                    if (err) return err
                })
            } else {
                res.send("0") // already
            }
        })


    }
}

exports.getAllWorkPlace = (req, res, next) => {
    workPlace.find().exec((err, data) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(data)
        }
    })
}

exports.delWorkPlace = (req, res, next) => {
    workPlace.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            res.send("0")
        } else {
            res.send("1")
        }
    })
}