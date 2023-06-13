const express = require('express');
const workoutController = express.Router();
const workoutService = require('../services/workoutService');
const workoutMoveService = require('../services/workoutMoveService');
const authMiddleware = require('../middleware/auth');

/**
 * Controller method to get a list of workouts
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const getWorkouts = (request, response) => {
    workoutService.getList(request, (error, list) => {
        if (error) {
            response.status(500).send({ 
                status: false, 
                data: null, 
                error 
            });
        } else {
            response.status(200).send({ 
                status: true, 
                data: list, 
                error: null
            });
        }
    });
}

/**
 * Controller method to get one workout by ID
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const getOneWorkout = (request, response) => {
    workoutService.getOne(request, (error, workout) => {
        if (error) {
            response.status(500).send({ 
                status: false, 
                data: null, 
                error 
            });
        } else {
            response.status(200).send({ 
                status: true, 
                data: workout,
                error: null 
            });
        }
    });
}

/**
 * Controller method to create a workout row
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const createWorkout = (request, response) => {
    workoutService.create(request, (error, result) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            response.status(200).send({
                status: true,
                data: result,
                error: null
            });
        }
    });
}

/**
 * Controller method to create a workout_move row
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const createWorkoutMove = (request, response) => {
    request.body.workout_id = request.params.id;
 
    workoutMoveService.create(request, (error, result) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            response.status(200).send({
                status: true,
                data: result,
                error: null
            });
        }
    });
}

/**
 * Controller method to update a workout
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const updateWorkout = (request, response) => {
    workoutService.update(request, (error, count) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            if (count === 0) {
                response.status(500).send({ 
                    status: false,
                    data: null,
                    error: null
                });
            } else {
                response.status(200).send({ 
                    status: true,
                    data: null,
                    error: null
                });
            }
        }
    });
}

/**
 * Controller method to delete a workout move
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const updateWorkoutMove = (request, response) => {
    workoutMoveService.update(request, (error, count) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            if (count === 0) {
                response.status(500).send({
                    status: false,
                    data: null,
                    error: null
                });
            } else {
                response.status(200).send({
                    status: true,
                    data: null,
                    error: null
                });
            }
        }
    });
}

/**
 * Controller method to delete a workout row
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const deleteWorkout = (request, response) => {
    workoutService.delete(request, (error, result) => {
        if (error) {
            console.log(error);

            response.status(500).send({
                status: false,
                data: null,
                error
            });
        } else {
            response.status(200).send({
                status: true,
                data: result,
                error: null
            });
        }
    });
}

/**
 * Controller method to delete a workout_move row
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const deleteWorkoutMove = (request, response) => {
    workoutMoveService.delete(request, (error, result) => {
        if (error)  {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        }

        response.status(200).send({
            status: true,
            data: result,
            error: null
        });
    });
}

workoutController.get('/', getWorkouts);
workoutController.get('/:id', getOneWorkout);
workoutController.post('/', authMiddleware.authenticateToken, createWorkout);
workoutController.post('/:id/move', authMiddleware.authenticateToken, createWorkoutMove);
workoutController.put('/:id', authMiddleware.authenticateToken, updateWorkout);
workoutController.put('/:workout_id/move/:move_id', authMiddleware.authenticateToken, updateWorkoutMove);
workoutController.delete('/:id', authMiddleware.authenticateToken, deleteWorkout);
workoutController.delete('/move/:move_id', authMiddleware.authenticateToken, deleteWorkoutMove);

module.exports = workoutController;