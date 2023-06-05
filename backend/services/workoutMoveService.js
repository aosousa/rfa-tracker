const workoutMoveDao = require('../dao/workoutMoveDao');
const workoutMoveService = {};

/**
 * Service layer to call the Data Access Object to
 * create a workout_move row
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
workoutMoveService.create = (request, createCB) => {
    workoutMoveDao.create(request, (error, result) => {
        if (error) {
            return createCB(error);
        }

        return createCB(null, result);
    });
}

/**
 * Service layer to call the Data Access Object to 
 * update a workout_move row
 * @param {Object} request Request data
 * @param {Function} updateCB Callback method
 */
workoutMoveService.update = (request, updateCB) => {
    workoutMoveDao.update(request, (error, result) => {
        if (error) {
            return updateCB(error);
        }

        return updateCB(null, result);
    });
}

/**
 * Service layer to call the Data Access Object to
 * delete a workout_move row
 * @param {Object} request Request data
 * @param {Function} deleteCB Callback method
 */
workoutMoveService.delete = (request, deleteCB) => {
    workoutMoveDao.delete(request, (error, result) => {
        if (error) {
            return deleteCB(error);
        }

        return deleteCB(null, result);
    });
}

module.exports = workoutMoveService;