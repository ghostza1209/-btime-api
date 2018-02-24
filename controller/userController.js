var user = require('../model/user')

exports.register = (req, res, next) => {
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("lastname", "Lastname is required").notEmpty();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "password is required").notEmpty();
    req.checkBody("confirmPass", "enter confirm password").notEmpty();
    req.checkBody("confirmPass", "Passwords do not match").equals(req.body.password);
    req.checkBody("rate", "Rate is required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.send(errors)
    } else {
        var newUser = new user({
            name: req.body.name,
            lastName: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            confirm: req.body.confirmPass,
            rate: req.body.rate,
            provider: req.body.provider
        });

        user.createUser(newUser, function (err, user) {
            if (err) return err;
        });
        res.send("1")
    }
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

