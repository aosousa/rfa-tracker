const express = require('express');
const authController = express.Router();
const authService = require('../services/authService');
const authMiddleware = require('../middleware/auth');

/**
 * 
 * @param {Object} request Request data
 * @param {Object} response Response object
 */
const login = (request, response) => {
    authService.login(request, (error, result) => {
        if (error) {
            response.status(500).send({
                status: false,
                data: null,
                error
            });
        }

        response.status(200).send({
            status: true,
            data: authMiddleware.generateToken(request.body.username),
            error: null
        });
    });
}

authController.post('/login', login);

module.exports = authController;