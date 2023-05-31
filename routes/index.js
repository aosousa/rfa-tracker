const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.json({ title: 'Ring Fit Adventure Tracker', version: '1.0.0' }));

module.exports = router;