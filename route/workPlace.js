const router = require("express").Router();
const workPlaceController = require('../controller/workPlaceController')
const workPlace = require('mongoose').model('workPlace')


router.post('/addWorkplace', workPlaceController.addWorkplace)
router.get('/workplace', workPlaceController.getAllWorkPlace)
router.delete('/workplace/:id', workPlaceController.delWorkPlace)

module.exports = router