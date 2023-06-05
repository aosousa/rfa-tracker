const models = require('../models/index');
const bodypartDao = {};

bodypartDao.getList = (request, getListCB) => {
    models.Bodypart.findAll()
        .then((bodyparts) => getListCB(null, bodyparts),
            (error) => getListCB({ error, message: error.parent }
        ));
}

module.exports = bodypartDao;