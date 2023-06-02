const express = require('express');
const bodypartController = express.Router();
const bodypartService = require('../services/bodypartService');

const getBodyparts = (request, response) => {
    bodypartService.getList(request, (error, list) => {
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

bodypartController.get('/', getBodyparts);

module.exports = bodypartController;