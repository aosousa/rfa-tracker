const bodypartDao = require('../dao/bodypartDao');
const bodypartService = {};

bodypartService.getList = (request, getListCB) => {
    bodypartDao.getList(request, (error, result) => {
        if (error) {
            return getListCB(error);
        }

        return getListCB(null, result);
    });
}

module.exports = bodypartService;