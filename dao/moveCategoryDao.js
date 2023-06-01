const models = require('../models/index');
const moveCategoryDao = {};

moveCategoryDao.getList = (request, getListCB) => {
    models.Move_category.findAll()
        .then((moveCategories) => getListCB(null, moveCategories),
            (error) => getListCB({ error, message: error.parent })
        );
}

module.exports = moveCategoryDao;