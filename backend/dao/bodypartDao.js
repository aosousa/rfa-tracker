const models = require('../models/index');
const bodypartDao = {};

bodypartDao.getList = (request, getListCB) => {
    models.Bodypart.findAll()
        .then((bodyparts) => getListCB(null, bodyparts),
            (error) => getListCB(error.parent)
        );
}

module.exports = bodypartDao;