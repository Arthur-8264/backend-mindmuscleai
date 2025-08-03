// routes/pagamentoRoutes.js

const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

// Atualiza o status de pagamento (ativo, inativo, inadimplente)
router.post('/atualizar-status', pagamentoController.atualizarStatusPagamento);

module.exports = router;
