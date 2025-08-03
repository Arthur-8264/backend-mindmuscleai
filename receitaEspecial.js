const express = require("express");
const router = express.Router();
const receitaEspecial = require("../controllers/receitaEspecialController");

router.post("/", receitaEspecial);

module.exports = router;
