// const attend = require('mongoose').model('attend')
const router = require("express").Router();
const attendController = require('../controller/attendController')
router.route('/attend')
    .post(attendController.addWorkTime)
    .get(attendController.getAllAttendInThisDay)

// router.route('/attend/:id')
//     .put(attendController.updateAttendByid)
//     .get(attendController.getAttendById)

router.route('/checkOut')
    .post(attendController.addCheckoutTime)
    .get(attendController.getAllCheckoutInThisDay)
module.exports = router