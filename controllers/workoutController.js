const express = require('express');
const workoutController = express.Router();

const workoutService = require('../services/workoutService');
const workoutMoveService = require('../services/workoutMoveService');

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
        }

        response.status(200).send({ 
            status: true, 
            data: list, 
            error: null
        });
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
        }

        response.status(200).send({ 
            status: true, 
            data: workout,
            error: null 
        });
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
        }

        response.status(200).send({
            status: true,
            data: result,
            error: null
        });
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
        }

        if (count === 0) {
            response.staus(200).send({ 
                status: false,
                data: null,
                error: null
            });
        }

        response.status(200).send({ 
            status: true,
            data: null,
            error: null
        });
    });
}

workoutController.get('/', getWorkouts);
workoutController.get('/:id', getOneWorkout);
workoutController.post('/:id/move', createWorkoutMove);
workoutController.put('/:id', updateWorkout);

module.exports = workoutController;