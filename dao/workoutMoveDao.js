const models = require('../models/index');
const workoutMoveDao = {};

/**
 * Create a new workout_move row
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
workoutMoveDao.create = (request, createCB) => {
    models.Workout_move.create(request.body)
        .then((workoutMove) => createCB(null, workoutMove),
            ((error) => createCB({ error, message: error.parent }))
    );
}

// TODO: update workout move by workout and move IDs

// TODO: delete workout move by workout and move IDs

module.exports = workoutMoveDao;