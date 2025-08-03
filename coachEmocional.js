const express = require('express');
const router = express.Router();
const coachEmocionalController = require('../controllers/coachEmocionalController');

// Rota protegida - apenas para plano Premium
router.post('/', coachEmocionalController.gerarCoachEmocional);

module.exports = router;
