const authDao = require('../dao/authDao');
const authService = {};

/**
 * Service layer to call the Data Access Object to 
 * perform login
 * @param {Object} request Request data
 * @param {Function} loginCB Callback method
 */
authService.login = (request, loginCB) => {
    authDao.login(request, (error, result) => {
        if (error) {
            return loginCB(error);
        }

        return loginCB(null, result);
    });
}

module.exports = authService;