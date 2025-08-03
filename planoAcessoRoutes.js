import express from 'express';
import { verificarAcesso } from '../controllers/planoAcessoController.js';

const router = express.Router();

router.get('/:id', verificarAcesso); // Ex: /api/acesso/123?recurso=coach-emocional

export default router;
