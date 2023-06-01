const express = require('express');
const router = express.Router();

const bodypartController = require('../controllers/bodypartController');
const moveController = require('../controllers/moveController');
const moveCategoryController = require('../controllers/moveCategoryController');

router.use('/bodyparts', bodypartController);
router.use('/moves', moveController);
router.use('/move_categories', moveCategoryController);

module.exports = router;