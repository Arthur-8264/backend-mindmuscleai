const express = require('express');
const router = express.Router();
const { gerarExplicacaoExercicio } = require('../controllers/comoFazerExerciciosController');

router.post('/', gerarExplicacaoExercicio);

module.exports = router;
