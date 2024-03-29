const models = require("../models/index");
const workoutMoveDao = {};

/**
 * Create a new workout_move row
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
workoutMoveDao.create = (request, createCB) => {
  models.Workout_move.create(request.body).then(
    (workoutMove) => createCB(null, workoutMove),
    (error) => createCB(error.parent)
  );
};

/**
 * Update a workout_move row by workout and move IDs
 * @param {Object} request Request data
 * @param {Function} updateCB Callback method
 */
workoutMoveDao.update = (request, updateCB) => {
  models.Workout_move.update(request.body, {
    where: {
      workout_id: request.params.workout_id,
      move_id: request.params.move_id,
    },
  }).then(
    (count) => updateCB(null, count),
    (error) => updateCB(error.parent)
  );
};

/**
 * Create a new workout_move row if needed, or an update
 * an existing one
 * @param {Object} request Request data
 * @param {Function} createOrUpdateCB Callback method
 */
workoutMoveDao.createOrUpdate = (request, createOrUpdateCB) => {
  models.Workout_move.findOne({
    where: {
      workout_id: request.params.workout_id,
      move_id: request.params.move_id,
    },
  }).then((result) => {
    if (result) {
      return workoutMoveDao.update(request, createOrUpdateCB);
    }

    return workoutMoveDao.create(request, createOrUpdateCB);
  });
};

/**
 * Delete a workout_move row
 * @param {Object} request Request data
 * @param {Function} deleteCB Callback method
 */
workoutMoveDao.delete = (request, deleteCB) => {
  models.Workout_move.destroy({
    where: {
      id: request.params.move_id,
    },
  }).then(
    () => deleteCB(null, true),
    (error) => deleteCB(error.parent)
  );
};

module.exports = workoutMoveDao;
