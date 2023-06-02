const workoutMoveDao = require('../dao/workoutMoveDao');
const workoutService = {};

/**
 * Service layer to call the Data Access Object to
 * create a workout_move row
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
workoutService.create = (request, createCB) => {
    workoutMoveDao.create(request, (error, result) => {
        if (error) {
            return createCB(error);
        }

        return createCB(null, result);
    });
}

module.exports = workoutService;