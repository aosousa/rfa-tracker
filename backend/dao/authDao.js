const models = require('../models/index');
const bcrypt = require('bcrypt');
const authDao = {};

authDao.login = (request, loginCB) => {
    models.User.findOne({
        where: {
            username: request.body.username
        }
    }).then((user) => {
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                return loginCB(null, user);
            } else {
                return loginCB("Authentication failed!");
            }
        } else {
            return loginCB("Authentication failed!");
        }
    });
}

module.exports = authDao;