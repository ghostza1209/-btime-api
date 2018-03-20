const router = require("express").Router();
const userController = require('../controller/userController')
const passport = require('passport')
const local = require('../config/strategies/local')
const user = require('mongoose').model('user')
const path = require('path')

// const multer = require('multer')
// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'upload/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname))

//     }
// })

// function fileFilter(file, cb) {
//     const fileType = /jpeg|jpg|png|gif/;
//     const extName = fileType.test(path.extname(file.originalname).toLowerCase())
//     const mimeType = fileType.test(file.mimetype)

//     if (mimeType && extName) {
//         return cb(null, true)
//     } else {
//         cb('Error: Images Only!', false)
//     }
// }
// const upload = multer({
//     storage: multerStorage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: (req, file, cb) => {
//         fileFilter(file, cb)
//     }
// }).single('profileImage')

router.route('/user')
    .post(userController.register)
    .get(userController.getUser)
router.route('/user/:id')
    .delete(userController.delUser)
    .get(userController.getById)
    .put(userController.editUser)
router.post('/user/:username', (req, res) => {
    user.getUserByUsername(req.params.username, (err, user) => {
        if (err) {
            return err
        }
        if (!user) {
            return res.send("not found User!")
        }
        res.json({
            name: user.name,
            lastName: user.lastName
        })
    })
})

local() //เรียกใช้ LocalStrategy
passport.serializeUser(function(user, done) { //เก็บ user.id เข้า Cookie
    done(null, user.id)
})
passport.deserializeUser(function(id, done) { // 
    user.findOne({
        _id: id
    }, function(err, user) {
        done(err, user)
    })
})

router.post('/login',
    passport.authenticate('local'), (req, res) => {
        res.json({
            uname: req.user.username,
            id: req.user._id,
            type: req.user.type,
            auth: req.isAuthenticated()
        })
    });

module.exports = router;