const models = require('../models/index');
const moveDao = {};

/**
 * Fetch data for move list
 * 
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
moveDao.getList = (request, getListCB) => {
    models.Move.findAll({
        include: [
            {
                model: models.Move_category,
                as: 'move_category_move'
            }
        ]
    }).then((moves) => getListCB(null, moves), 
        (error) => getListCB(error.parent)
    );
}

module.exports = moveDao;