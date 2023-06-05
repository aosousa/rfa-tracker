const models = require('../models/index');
const { Op } = require('sequelize');
const workoutDao = {};

/**
 * Fetch data for workout list
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
workoutDao.getList = (request, getListCB) => {
    models.Workout.findAll({
        include: [
            {
                model: models.Workout_move,
                as: 'moves',
                include: [
                    {
                        model: models.Move,
                        as: 'move'
                    }
                ]
            }
        ]
    }).then((workouts) => getListCB(null, workouts),
        (error) => getListCB({ error, message: error.parent })
    );
}

/**
 * Filter workouts by date
 * @param {Object} request Request data
 * @param {Function} getListCB Callback method
 */
workoutDao.filterByDate = (request, getListCB) => {
    models.Workout.findAll({
        where: {
            start_at: {
                [Op.between]: [request.query.start_at, request.query.end_at]
            }
        },
        include: [
            {
                model: models.Workout_move,
                as: 'moves',
                include: [
                    {
                        model: models.Move,
                        as: 'move'
                    }
                ]
            }
        ]
    }).then((workouts) => getListCB(null, workouts),
        (error) => getListCB({ error, message: error.parent })
    );
}

/**
 * Get a workout by ID
 * @param {Object} request Request data
 * @param {Function} getDataCB Callback method
 */
workoutDao.getByID = (request, getDataCB) => {
    models.Workout.findOne({
        where: {
            id: request.params.id
        },
        include: [
            {
                model: models.Workout_move,
                as: 'moves',
                include: [
                    {
                        model: models.Move,
                        as: 'move'
                    }
                ]
            }
        ]
    }).then((workout) => getDataCB(null, workout),
        (error) => getDataCB({ error, message: error.parent })
    );
}

/**
 * Create a workout
 * @param {Object} request Request data
 * @param {Function} createCB Callback method
 */
workoutDao.create = (request, createCB) => {
    models.Workout.create(request.body)
        .then((workout) => createCB(null, workout),
            ((error) => createCB({ error, message: error.parent })
        ));
}

/**
 * Update a workout by ID
 * @param {Object} request Request data
 * @param {Function} updateCB Callback method
 */
workoutDao.update = (request, updateCB) => {
    models.Workout.update(request.body, {
        where: {
            id: request.params.id
        }
    }).then((count) => updateCB(count),
        (error) => updateCB({ error, message: error.parent })
    );
}

/**
 * Delete a workout row
 * @param {Object} request Request data
 * @param {Function} deleteCB Callback method
 */
workoutDao.delete = (request, deleteCB) => {
    models.Workout.destroy({
        where: {
            id: request.params.id
        },
        cascade: true
    }).then(() => deleteCB(null, true),
        ((error) => deleteCB({ error, message: error.parent }))
    );
}

module.exports = workoutDao;