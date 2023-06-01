const express = require('express');
const bodypartController = express.Router();
const bodypartService = require('../services/bodypartService');

const getBodyparts = (request, response) => {
    bodypartService.getList(request, (error, list) => {
        if (error) {
            response.status(500).send(error);
        }

        response.status(200).send(list);
    });
}

bodypartController.get('/', getBodyparts);

module.exports = bodypartController;