// routes/gerarDieta.js
const express = require("express");
const router = express.Router();
const { gerarDieta } = require("../controllers/gerarDietaController");

router.post("/", gerarDieta);

module.exports = router;
