const express = require('express');
const moveCategoryController = express.Router();
const moveCategoryService = require('../services/moveCategoryService');

const getMoveCategories = (request, response) => {
    moveCategoryService.getList(request, (error, list) => {
        if (error) {
            response.status(500).send(error);
        }

        response.status(200).send(list);
    });
}

moveCategoryController.get('/', getMoveCategories);

module.exports = moveCategoryController;