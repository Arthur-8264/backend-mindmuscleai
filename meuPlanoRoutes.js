import express from 'express';
import { obterPlanoDoUsuario } from '../controllers/meuPlanoController.js';

const router = express.Router();

// Rota protegida que retorna o plano do usuário
router.get('/:id', obterPlanoDoUsuario);

export default router;
