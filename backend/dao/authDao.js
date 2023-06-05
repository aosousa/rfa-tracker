const models = require('../models/index');
const bcrypt = require('bcrypt');
const authDao = {};

authDao.login = (request, loginCB) => {
    models.User.findOne({
        where: {
            username: request.body.username,
            password: request.body.password
        }
    }).then((user) => {
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                return loginCB(null, user);
            } else {
                return loginCB({
                    error: "Authentication failed!"
                });
            }
        } else {
            return loginCB({
                error: "Authentication failed!"
            });
        }
    });
}

module.exports = authDao;