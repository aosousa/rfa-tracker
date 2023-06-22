const workoutDao = require("../dao/workoutDao");
const workoutMoveDao = require("../dao/workoutMoveDao");
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
};

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
};

/**
 * Service layer to call the Data Access Object to
 * create a workout (and workout_move rows linked to it)
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
workoutService.create = (request, createCB) => {
  workoutDao.create(request, (error, result) => {
    if (error) {
      return createCB(error);
    }

    request.body.moves.forEach((move) => {
      move.workout_id = result.id;

      move.body = move;

      workoutMoveDao.create(move, () => {});
    });

    return createCB(null, result);
  });
};

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

    request.body.moves.forEach((move) => {
      move.body = {
        ...move,
        workout_id: Number(request.params.id),
      };

      move.params = {
        move_id: move.move_id,
        amount: move.amount,
        workout_id: request.params.id,
      };

      workoutMoveDao.createOrUpdate(move, () => {});
    });

    return updateCB(null, result);
  });
};

/**
 * Service layer to call the Data Access Object to
 * delete a workout (and its workout_move rows
 * through cascading)
 * @param {Object} request Request data
 * @param {Function} deleteCB Callback method
 */
workoutService.delete = (request, deleteCB) => {
  workoutDao.delete(request, (error, result) => {
    if (error) {
      return deleteCB(error);
    }

    return deleteCB(null, result);
  });
};

module.exports = workoutService;
