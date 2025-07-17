// routes/ondeComprar.js

const express = require("express");
const router = express.Router();
const { ondeComprarAlimentos } = require("../controllers/ondeComprarController");

router.post("/onde-comprar", ondeComprarAlimentos);

module.exports = router;

