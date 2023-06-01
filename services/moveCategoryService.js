const moveCategoryDao = require('../dao/moveCategoryDao');
const moveCategoryService = {};

/**
 * Service layer to call the Data Access Object to get the list of moves
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
moveCategoryService.getList = (request, getListCB) => {
    moveCategoryDao.getList(request, (error, result) => {
        if (error) {
            return getListCB(error);
        }

        return getListCB(null, result);
    });
}

module.exports = moveCategoryService;