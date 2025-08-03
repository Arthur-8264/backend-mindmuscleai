import express from 'express';
import { verificarAcessoPorPlano } from '../controllers/acessoController.js';
const router = express.Router();
router.get('/acesso/:id', verificarAcessoPorPlano);
export default router;
