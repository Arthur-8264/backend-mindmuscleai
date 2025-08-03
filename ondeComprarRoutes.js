import express from 'express';
import { ondeComprar } from '../controllers/ondeComprarController.js';
const router = express.Router();
router.post('/onde-comprar', ondeComprar);
export default router;
