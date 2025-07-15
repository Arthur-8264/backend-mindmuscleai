const express = require('express');
const router = express.Router();
const { gerarCronograma } = require('../controllers/gerarCronogramaController');

router.post('/gerar-cronograma', gerarCronograma);

module.exports = router;

