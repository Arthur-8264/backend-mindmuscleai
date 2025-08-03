// routes/comoFazer.js

const express = require('express');
const router = express.Router();
const comoFazerController = require('../controllers/comoFazerController');

router.get('/:nome', comoFazerController.getExplicacao);

module.exports = router;
