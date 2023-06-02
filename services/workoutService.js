const workoutDao = require('../dao/workoutDao');
const async = require('async');
const workoutService = {};

/**
 * Service layer to call the Data Access Object to get the list of workouts
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
workoutService.getList = (request, getListCB) => {
    // if start_at and end_at params are set, filter workouts by date
    if (request.query.start_at && request.query.end_at) {
        workoutDao.filterByDate(request, (error, result) => {
            if (error) {
                return getListCB(error);
            }

            return getListCB(null, result);
        });
    } else {
        workoutDao.getList(request, (error, result) => {
            workoutDao.getList(request, (error, result) => {
                if (error) {
                    return getListCB(error);
                }

                return getListCB(null, result);
            });
        });
    }
}

/**
 * Service layer to call the Data Access Object to get 
 * one workout
 * @param {Object} request Request data
 * @param {Function} getDataCB Callback method
 */
workoutService.getOne = (request, getDataCB) => {
    workoutDao.getByID(request, (error, result) => {
        if (error) {
            return getDataCB(error);
        }

        return getDataCB(null, result);
    });
}

/**
 * Service layer to call the Data Access Object to 
 * update one workout
 * @param {Object} request Request data
 * @param {Function} updateCB Callback method
 */
workoutService.update = (request, updateCB) => {
    workoutDao.update(request, (error, result) => {
        if (error) {
            return updateCB(error);
        }

        return updateCB(null, result);
    });
}

module.exports = workoutService;