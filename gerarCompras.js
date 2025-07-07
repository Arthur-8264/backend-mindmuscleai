const express = require('express');
const router = express.Router();
const gerarComprasController = require('../controllers/gerarComprasController');

router.post('/', gerarComprasController);

module.exports = router;
