var attend = require('../model/attend')
var moment = require('moment')
var startDay = moment().startOf('day').toISOString()
var endDay = moment().endOf('day').add(7, 'h').toISOString()


exports.addWorkTime = (req, res, next) => {
    req.checkBody("timeIn", "กรุณากรอกเวลาเข้างาน").notEmpty();
    req.checkBody("timeOut", " กรุณากรอกเวลาออกงาน").notEmpty();
    // req.checkBody("whereWork", "กรุณากรอกสถานที่ทำงาน ").equals(0);
    var errors = req.validationErrors();
    if (errors) {
        return res.send(errors)
    } else {
        let newAttend = new attend({
            attendTime: req.body.timeIn,
            offTime: req.body.timeOut,
            workPlace: req.body.whereWork,
            user: req.body.id
        })
        // console.log(newAttend)
        attend.find({
                date: {
                    $gte: startDay,
                    $lt: endDay
                },
                user: newAttend.user
            })
            .populate('user')
            .exec((err, attendData) => {

                if (attendData.length == 0) {
                    attend.createAttend(newAttend, (err, user) => {
                        if (err) return err;
                        console.log(user)
                    });
                    console.log("is not attend")
                    // return res.status(200).json({
                    //     // errors: "",
                    //     status: 1
                    // })
                    res.send("1")
                } else {
                    console.log(attendData[0].user.username + " have attend already on today")
                    // return res.status(200).json({
                    //     // errors: attendData[0].user.username + "ลงเวลาเข้าแล้ว",
                    //     status: 0
                    // })
                }
            })
    }
}

exports.getAllAttendInThisDay = (req, res, next) => {
    console.log(endDay)
    attend.find({
            date: {
                $gte: startDay,
                $lt: endDay
            }
        })
        .populate('user', 'name lastName')
        .populate('workPlace', 'projectName villaName')
        .exec()
        .then(attend => {
            if (!attend) {
                return res.status(404).json({
                    message: 'Attend not found'
                })
            }
            res.status(200).json({
                count: attend.length,
                attend: attend
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