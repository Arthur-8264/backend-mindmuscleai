// routes/planRoutes.js
import express from 'express';
import {
  obterPlanoUsuario,
  atualizarPlanoUsuario
} from '../controllers/planController.js';

const router = express.Router();

router.get('/:id', obterPlanoUsuario);
router.put('/:id', atualizarPlanoUsuario);

export default router;
