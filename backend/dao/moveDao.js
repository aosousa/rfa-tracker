const models = require('../models/index');
const moveDao = {};

/**
 * Fetch data for move list
 * 
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
moveDao.getList = (request, getListCB) => {
    models.Move.findAll({}).then((moves) => getListCB(null, moves), 
        (error) => getListCB(error.parent)
    );
}

module.exports = moveDao;