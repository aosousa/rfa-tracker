const express = require('express');
const moveController = express.Router();
const moveService = require('../services/moveService');

const getMoves = (request, response) => {
    moveService.getList(request, (error, list) => {
        if (error) {
            response.status(500).send(error);
        }

        response.status(200).send(list);
    });
}

moveController.get('/', getMoves);

module.exports = moveController;