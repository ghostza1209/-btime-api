var attend = require('../model/attend')
var checkOut = require("../model/checkOut")
var moment = require('moment')
var startDay = moment().startOf('day').toISOString()
var endDay = moment().endOf('day').add(7, 'h').toISOString()
    // Set local zone
moment.locale("th");
var timeNow = moment(new Date(), "HH:mm").format('LTS');


exports.addWorkTime = (req, res, next) => {
    let newAttend = new attend({
            attendTime: timeNow,
            user: req.body.id
        })
        //function createAteend 
    createAttend = function() {
            attend.createAttend(newAttend, (err, user) => {
                if (err) {
                    res.status(404).send({
                        message: "ไม่สามารถลงเวลาเข้าได้!" + err
                    })
                }
                res.status(200).send({
                    message: "ลงเวลาเข้าสำเร็จ!"
                })
            })
        }
        //check Is attend in today!
    attend.find({
        user: req.body.id,
        date: {
            $gte: startDay,
            $lt: endDay
        }
    }).exec((err, data) => {
        if (err) {
            return (res.status(200).send({
                message: "พบปัญหา : " + err
            }))
        } else {
            if (data.length == 0) {
                //Insert to attend collections
                createAttend()
            } else {
                res.status(200).send({
                    message: "รหัส " + data[0].user + " ได้ลงเวลาแล้ว"
                })
            }
        }
    })
}


exports.addCheckoutTime = (req, res, next) => {
    let newCheckOut = new checkOut({
            checkOutTime: timeNow,
            user: req.body.id
        })
        //function createAteend 
    createCheckout = function() {
            checkOut.createCheckout(newCheckOut, (err, user) => {
                if (err) {
                    res.status(404).send({
                        message: "ไม่สามารถลงเวลาออกได้!" + err
                    })
                }
                res.status(200).send({
                    message: "ลงเวลาออกสำเร็จ!"
                })
            })
        }
        //check Is attend in today!
    checkOut.find({
        user: req.body.id,
        date: {
            $gte: startDay,
            $lt: endDay
        }
    }).exec((err, data) => {
        if (err) {
            return (res.status(200).send({
                message: "พบปัญหา : " + err
            }))
        } else {
            if (data.length == 0) {
                //Insert to attend collections
                createCheckout()
            } else {
                res.status(200).send({
                    message: "รหัส " + data[0].user + " ได้ลงเวลาแล้ว"
                })
            }
        }
    })
}

exports.getAllAttendInThisDay = (req, res, next) => {
    attend.find({
            date: {
                $gte: startDay,
                $lt: endDay
            }
        })
        .populate('user', 'name lastName profileImage')
        // .populate('workPlace', 'projectName villaName')
        .exec()
        .then(attend => {
            if (attend.length == 0) {
                return res.status(200).json({
                    message: 'ยังไม่มีคนลงเวลางาน',
                    count: attend.length
                })
            }

            res.status(200).json({
                count: attend.length,
                attend: attend,
                message: ""
            })
        })
}

exports.getAllCheckoutInThisDay = (req, res, next) => {
    checkOut.find({
            date: {
                $gte: startDay,
                $lt: endDay
            }
        })
        .populate('user', 'name lastName')
        .exec()
        .then(attend => {
            if (attend.length == 0) {
                return res.status(200).json({
                    message: 'ยังไม่มีคนลงเวลางาน',
                    count: attend.length
                })
            }

            res.status(200).json({
                count: attend.length,
                attend: attend,
                message: ""
            })
        })
}

exports.updateAttendByid = (req, res, next) => {
    var query = {
        _id: req.params.id
    };
    var updateQuery = req.body;
    attend.findOneAndUpdate(query, updateQuery, {
        new: true
    }, (err, data) => {
        if (err) res.send(err)
        else res.json(data)
    })
}

exports.getAttendById = (req, res, next) => {
    attend.findOne({
        user: req.params.id,
        date: {
            $gte: startDay,
            $lt: endDay
        }
    }).populate('user', '_id').exec().then(attend => {
        if (!attend) {
            return res.status(200).json({
                message: 'Attend not found'
            })
        }
        return res.status(200).json(attend)

    })
}