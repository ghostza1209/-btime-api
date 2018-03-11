var user = require('../model/user')
var path = require('path')
var formidable = require('formidable')
var fs = require('fs')

exports.register = (req, res, next) => {
    var newUser = new user({
        name: undefined,
        lastName: undefined,
        username: undefined,
        password: undefined,
        confirm: undefined,
        rate: undefined,
        provider: undefined,
        profileImage: undefined
    });
    let errors = req.validationErrors();
    if (errors) {
        return res.send(errors)
    } else {
        // Config formidable
        const uploadDir = path.join('public/upload/')
        let form = new formidable.IncomingForm();
        form.multiples = false
        form.keepExtensions = true
        form.maxFieldsSize = 5 * 1024 * 1024
        // form.uploadDir = uploadDir
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(500).json({
                    errors: err
                })
            } else {
                if (files.hasOwnProperty('file')) {
                    console.log("has file")
                } else {
                    console.log("no file")
                }
                newUser.name = fields.name
                newUser.lastName = fields.lastname
                newUser.username = fields.username
                newUser.password = fields.password
                newUser.confirm = fields.confirmPass
                newUser.rate = fields.rate
                newUser.provider = fields.provider
                // Insert User into Mongodb
                user.createUser(newUser, function (err, user) {
                    if (err) {
                        return err
                    }
                });
            }
        });
        form.on('fileBegin', function (name, file) {
            console.log("file Begin")
            const [fileName, fileExt] = file.name.split('.')
            const newFileNameIncludeExt = `${new Date().getTime()}.${fileExt}`
            // file.path must be define but won't work when lost
            file.path = path.join(uploadDir, newFileNameIncludeExt)
            newUser.profileImage = file.path
        });
        // form.onPart = function (part) {
        //     Object.prototype.count = function () {
        //         var count = 0;
        //         for (var prop in this) {
        //             if (this.hasOwnProperty(prop))
        //                 count = count + 1;
        //         }
        //         return count;
        //     }
        // }
    }
    res.send('1')

}



exports.getUser = async (req, res, next) => {
    await user.find({}).where('type', 0).select('-password -salt -provider -__v -type').exec(function (err, user) {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(user)
        }
    })
}

exports.delUser = (req, res, next) => {
    user.findOne({
        _id: req.params.id
    }, (err, user) => {
        if (err) {
            return res.status(400).send(err)
        } else {
            let profileImagePath = user.profileImage
            if (profileImagePath !== undefined) {
                fs.unlink(profileImagePath, (err) => {
                    if (err) return res.status(400).send(err);
                });
            }
            user.remove({
                _id: req.params.id
            }, function (err) {
                if (err) {
                    console.log('remove failed')
                    return res.status(400).send(err)
                } else {
                    return res.send('delete ok')
                }
            })
        }
    })
}

exports.getById = (req, res, next) => {
    user.findOne({
        _id: req.params.id
    }, (err, user) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json({
                name: user.name,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                rate: user.rate,
                profileImage: user.profileImage
            })
        }
    })
}

exports.editUser = (req, res, next) => {
    var query = {
        _id: req.params.id
    }
    var updateQuery = req.body;
    user.findOneAndUpdate(query, updateQuery, {
        new: true
    }, (err, user) => {
        if (err) res.send(err)
        else res.json(user)
    })

}

exports.getUserByUsername = (req, res, next) => {
    user.findOne({
        username: req.params.username
    }, (err, user) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(user)
        }
    })
}