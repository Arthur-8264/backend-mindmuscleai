// routes/videosExercicios.js
const express = require('express');
const router = express.Router();
const { buscarVideosExercicios } = require('../controllers/videosExerciciosController');

router.post('/', buscarVideosExercicios);

module.exports = router;
