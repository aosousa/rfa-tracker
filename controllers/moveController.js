const express = require('express');
const moveController = express.Router();
const moveService = require('../services/moveService');

const getMoves = (request, response) => {
    moveService.getList(request, (error, list) => {
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

moveController.get('/', getMoves);

module.exports = moveController;