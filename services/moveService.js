const moveDao = require('../dao/moveDao');
const moveService = {};

/**
 * Service layer to call the Data Access Object to get the list of moves
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
moveService.getList = (request, getListCB) => {
    moveDao.getList(request, (error, result) => {
        if (error) {
            return getListCB(error);
        }

        return getListCB(null, result);
    });
}

module.exports = moveService;