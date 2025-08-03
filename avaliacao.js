const express = require('express');
const router = express.Router();
const { enviarAvaliacao } = require('../controllers/avaliacaoController');

router.post('/', enviarAvaliacao);

module.exports = router;
