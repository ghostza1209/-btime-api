var user = require('../controller/userController')

module.exports = function (app) {

    app.route('/user')
        .post(user.addUser)
        .get(user.getUser)
    app.route('/user/:id')
        .delete(user.delUser)
        .get(user.getById)
        .put(user.editUser)

    app.route('/login')
        .post(user.login)

}