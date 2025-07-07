const express = require('express');
const router = express.Router();
const gerarCronogramaController = require('../controllers/gerarCronogramaController');

router.post('/', gerarCronogramaController);

module.exports = router;
