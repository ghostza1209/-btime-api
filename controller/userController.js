var user = require('../model/user')


exports.addUser = (req, res, next) => {
    var newUser = new user(req.body)
    newUser.save(function (err, user) {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(user)
        }
    })
}

exports.getUser = (req, res, next) => {
    user.find().exec(function (err, user) {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(user)
        }
    })
}

exports.delUser = (req, res, next) => {
    user.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            console.log('remove failed')
        } else {
            res.send('delete ok')
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
            res.json(user)
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

exports.login = (req, res, next) => {
    user.findOne({
        'username': req.body.username,
        'password': req.body.password
    }, function (err, user) {
        if (err) {
            res.send(err)
            return
        }
        if (user !== null) {
            res.json(user)
        } else {
            res.sendStatus(204) 
        }
    });
}